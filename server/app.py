from flask_sqlalchemy import SQLAlchemy
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

db = SQLAlchemy()


# Cloudinary configuration
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)
