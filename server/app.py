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


if __name__ == '__main__':
    app.run(debug=True, port=5000)


