# import cloudinary
# import cloudinary.uploader
# import cloudinary.api
# import os

# db = SQLAlchemy()


# # Cloudinary configuration
# cloudinary.config(
#     cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
#     api_key=os.environ.get("CLOUDINARY_API_KEY"),
#     api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
# )
from flask import Flask, make_response, request, jsonify, abort
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse

from models import db, User, DogHouse, Review

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


class UsersList(Resource):
    def get(self):
        users = User.query.all()
        return jsonify([users.to_dict() for user in users])


api.add_resource(UsersList, '/users')


class UsersById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return jsonify(user.to_dict())
        else:
            return jsonify({"error": "User not found"})

    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return jsonify({"error": "User not found"})


api.add_resource(UsersById, '/users/<int:id>')


class DogHouseList(Resource):
    def get(self):
        doghouses = DogHouse.query.all()
        return jsonify([doghouses.to_dict() for doghouse in doghouses])

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('location', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        parser.add_argument('price_per_night', type=str, required=True)
        parser.add_argument('image_url', type=str, required=True)
        parser.add_argument('amenities', type=str, required=True)

        parser.add_argument('user_id', type=int, required=True)
        args = parser.parse_args()

        name = args['name']
        location = args['location']
        description = args['description']
        price_per_night = args['price_per_night']
        image_url = args['image_url']
        amenities = args['amenities']
        user_id = args['user_id']

        doghouse = DogHouseList(
            name=name, location=location, description=description, price_per_night=price_per_night, image_url=image_url, amenities=amenities, user_id=user_id
        )
        db.session.add(doghouse)
        db.session.commit()
        return jsonify(doghouse.user_id.to_dict()), 201


api.add_resource(DogHouseList, '/doghouses')


class ReviewList(Resource):
    def get(self):
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews])

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True)
        parser.add_argument('body', type=str, required=True)
        parser.add_argument('status', type=str, required=True)
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('doghouse_id', type=int, required=True)
        args = parser.parse_args()

        title = args['title']
        body = args['body']
        status = args['status']
        user_id = args['user_id']
        doghouse_id = args['doghouse_id']

        review = ReviewList(
            title=title, body=body, status=status, user_id=user_id, doghouse_id=doghouse_id
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.doghouse.to_dict()), 201


api.add_resource(ReviewList, '/reviews')


class ReviewsById(Resource):
    def get(self, id):
        review = Review.query.get(id)
        if review:
            return jsonify(review.to_dict())
        else:
            return jsonify({"error": "Review not found"})

    def delete(self, id):
        review = Review.query.get(id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return '', 204
        else:
            return jsonify({"review": "User not found"})


api.add_resource(ReviewsById, '/reviews/<int:id>')


if __name__ == '__main__':
    app.run(debug=True, port=5000)