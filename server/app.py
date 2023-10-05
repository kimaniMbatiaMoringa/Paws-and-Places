from dotenv import load_dotenv

load_dotenv()

from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from models import db, DogHouse, User, Review
from flask_cors import CORS
from flask_marshmallow import Marshmallow

# --------------------------------------------------------#
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField, SelectField, IntegerField
from wtforms.validators import InputRequired, Length, Email, EqualTo, ValidationError, NumberRange

# from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# ---------------------------------------------------------#

import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import cloudinary.api
import os


app = Flask(__name__)
ma = Marshmallow(app)
api = Api(app)

# app.config["SECRET_KEY"] = "your_secret_key_here"
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
cors = CORS(app)

migrate = Migrate(app, db)
db.init_app(app)


# # Cloudinary configuration
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)


# ----------------------------------------Forms for Input Validation---------------------------------------------------#
# Forms for Input Validation
class UserRegistrationForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=4, max=30)])
    email = StringField("Email", validators=[InputRequired(), Email(), Length(max=120)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6)])
    confirm_password = PasswordField("ConfirmPassword", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Sign Up")

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError("Username already exists")

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError("Email already exists")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email(), Length(max=120)])
    password = PasswordField("Password", validators=[InputRequired(), Length(6)])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


class CreateNewReviewForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(min=1, max=100)])
    body = TextAreaField("Body", validators=[InputRequired(), Length(min=1, max=500)])
    user_id = IntegerField("User ID", validators=[InputRequired(), NumberRange(min=1)])
    doghouse_id = IntegerField("Dog House ID", validators=[InputRequired(), NumberRange(min=1)])
    status = SelectField("Status", choices=[("Booked", "Booked"), ("Available", "Available"), ("Draft", "Draft")])
    submit = SubmitField("Create Review")


class UserSchema(ma.Schema):
    class Meta:
        model = User
        load_instance = True

        fields = ("id", "username", "email", "password")


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class DogHouseSchema(ma.Schema):
    class Meta:
        model = DogHouse

        load_instance = True
        # Fields to expose
        fields = (
            "id",
            "name",
            "location",
            "description",
            "price_per_night",
            "image_url",
            "amenities",
        )


doghouse_schema = DogHouseSchema()
doghouses_schema = DogHouseSchema(many=True)


class ReviewSchema(ma.Schema):
    class Meta:
        load_instance = True
        # Fields to expose
        fields = ("id", "title", "body", "user_id", "doghouse_id", "status")


review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


# RESTFUL API Endpoints
api = Api(app)


class Index(Resource):
    def get(self):
        response_dict = {
            "index": "Welcome to the Paws and Places RESTful API",
        }

        response = make_response(jsonify(response_dict), 200)

        return response


# Route Home
@app.route("/")
def home():
    response_dict = {
        "index": "Welcome to Paws and Places RESTful API",
    }
    response = make_response(jsonify(response_dict), 200)

    return response


# User ROUTES
# -----------------------------------------------------------------------------------------#
# Route GET users
@app.route("/users", methods=["GET"])
def get_user():
    users = [user.to_dict() for user in User.query.all()]
    result = users_schema.dump(users)
    return jsonify(result), 200


# Route to GET, PATCH, DELETE a user by ID
@app.route("/users/<int:user_id>", methods=["GET", "PATCH"])
def get_user_by_id(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:  # Does not exist
        return jsonify({"message": "User not found"}), 404
    else:
        if request.method == "GET":
            result = user_schema.dump(user)
            response = make_response(jsonify(result), 200)
            return response

        elif request.method == "PATCH":
            data = request.json()
            errors = user_schema.dump(data)
            if errors:
                return jsonify(errors), 400

            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()

            result = user_schema.dump(user)
            return jsonify(result), 200

        elif request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()

            return jsonify({"message": "User deleted"}), 204


# Route to POST create a user
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json()
    errors = user_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()

    result = user_schema.dump(new_user)
    return jsonify(result), 201


# Doghouse ROUTES
# -----------------------------------------------------------------------------------------#
@app.route("/doghouses", methods=["GET"])
def get_doghouses():
    doghouses = [house.to_dict() for house in DogHouse.query.all()]

    result = doghouses_schema.dump(doghouses)
    return jsonify(result), 200


# Route to GET, PATCH, DELETE a DogHouse
@app.route("/doghouses/<int:doghouse_id>", methods=["GET", "PATCH", "DELETE"])
def get_doghouse_by_id(doghouse_id):
    doghouse = DogHouse.query.filter_by(id=doghouse_id).first()
    if doghouse is None:
        return jsonify({"message": "Dog house not found"}), 404

    # GET
    if request.method == "GET":
        result = doghouse_schema.dump(doghouse)
        return jsonify(result), 200

    # PATCH
    elif request.method == "PATCH":
        data = request.json
        errors = doghouse_schema.validate(data)
        if errors:
            return jsonify(errors), 400
        for key, value in data.items():
            setattr(doghouse, key, value)
        db.session.commit()
        result = doghouse_schema.dump(doghouse)
        return jsonify(result), 200

    # DELETE
    elif request.method == "DELETE":
        db.session.delete(doghouse)
        db.session.commit()
        return jsonify({"message": "Dog house deleted"}), 204


# Route to create a DogHouse
@app.route("/doghouses", methods=["POST"])
def create_dog_house_listing():
    data = request.json

    # Serialize the amenities list to a string
    amenities = data.get("amenities")
    if amenities:
        data["amenities"] = ",".join(amenities)

    # Handling image uploads to Cloudinary
    image = request.files.get("image")
    if image:
        result = upload(image)
        image_url = result["secure_url"]  # Getting the Cloudinary URL
        data["image_url"] = image_url

    errors = doghouse_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    # Create a new DogHouse object and save it to the database
    new_doghouse = DogHouse(**data)
    db.session.add(new_doghouse)
    db.session.commit()

    result = doghouse_schema.dump(new_doghouse)
    return jsonify(result), 201

# Route for Fetching Reviews by Doghouse ID
@app.route("/doghouses/<int:doghouse_id>/reviews", methods=["GET"])
def get_reviews_by_doghouse_id(doghouse_id):
    reviews = Review.query.filter_by(doghouse_id=doghouse_id).all()
    result = reviews_schema.dump(reviews)
    return jsonify(result), 200



# Reviews ROUTES
# -----------------------------------------------------------------------------------------#


# Route to retrieve all reviews
@app.route("/reviews/", methods=["GET"])
@app.route("/reviews", methods=["GET"])
def get_reviews():
    reviews = [review.to_dict() for review in Review.query.all()]
    result = reviews_schema.dump(reviews)
    return jsonify(result), 200


# Route to create a new review
@app.route("/reviews", methods=["POST"])
def create_review():
    data = request.json
    errors = review_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_review = Review(**data)
    db.session.add(new_review)
    db.session.commit()

    result = review_schema.dump(new_review)
    return jsonify(result), 201


# Route to retrieve a review by ID
@app.route("/reviews/<int:review_id>", methods=["GET"])
def get_review_by_id(review_id):
    review = Review.query.filter_by(id=review_id).first()
    if review is None:
        return jsonify({"message": "Review not found"}), 404

    result = review_schema.dump(review)
    return jsonify(result), 200


# Route to update a review by ID
@app.route("/reviews/<int:review_id>", methods=["PUT"])
def update_review_by_id(review_id):
    data = request.json
    review = Review.query.filter_by(id=review_id).first()
    if review is None:
        return jsonify({"message": "Review not found"}), 404

    for key, value in data.items():
        setattr(review, key, value)
    db.session.commit()

    result = review_schema.dump(review)
    return jsonify(result), 200


# Route to delete a review by ID
@app.route("/reviews/<int:review_id>", methods=["DELETE"])
def delete_review_by_id(review_id):
    review = Review.query.filter_by(id=review_id).first()
    if review is None:
        return jsonify({"message": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted"}), 204


if __name__ == "__main__":
    app.run(debug=True, port=5555)
