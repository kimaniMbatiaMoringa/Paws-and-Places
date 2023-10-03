import os
from faker import Faker
from app import app, db, User, DogHouse, Review

# Initialize Faker for generating fake data
fake = Faker()

# Create a function to seed the database
def seed_database():
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    # Seed Users
    for _ in range(5):  # Create 5 fake users
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
        )
        db.session.add(user)

    # Seed DogHouses
    for _ in range(10):  # Create 10 fake dog houses
        doghouse = DogHouse(
            name=fake.company(),
            location=fake.address(),
            description=fake.text(),
            price_per_night=fake.random_element(elements=(50, 60, 70, 80, 90, 100)),
            images=fake.image_url(),
            amenities=fake.text(),
        )
        db.session.add(doghouse)

    # Seed Reviews
    for _ in range(20):  # Create 20 fake reviews
        review = Review(
            title=fake.sentence(),
            body=fake.paragraph(),
            user_id=fake.random_int(min=1, max=5),  # Assuming 5 users exist
            doghouse_id=fake.random_int(min=1, max=10),  # Assuming 10 doghouses exist
            status=fake.random_element(elements=("Booked", "Available", "Draft")),
        )
        db.session.add(review)

    # Commit changes to the database
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
