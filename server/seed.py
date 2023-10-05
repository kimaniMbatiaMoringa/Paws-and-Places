from app import app, db
from models import User, DogHouse, Review
from faker import Faker
import random
import datetime
from hashlib import sha256

image_urls = [
    "https://iili.io/J2oH7jf.png",
    "https://iili.io/Jdm8pSe.png",
    "https://iili.io/JdmSzOJ.png",
    "https://iili.io/Jdm8ZV2.png",
    "https://iili.io/J2oHlG2.png",
    "https://iili.io/J2oHlG2.png",
    "https://iili.io/Jdm8wAJ.png",
    "https://iili.io/Jdm8Nwv.png",
    "https://iili.io/Jdm8gcX.png",
    "https://iili.io/Jdm8tPS.png",
    "https://iili.io/JdmS9Hu.png",
    "https://iili.io/JdmSKiB.png",
    "https://iili.io/JdmSRiN.png",
    "https://iili.io/J2zifV9.png",
]


fake = Faker()

# a set to keep track of generated email addresses
generated_emails = set()

# Create a Flask application context
with app.app_context():
    # Delete existing records in the tables
    Review.query.delete()
    User.query.delete()
    DogHouse.query.delete()
    

    # Create fake users
    users = []
    for _ in range(10):
        username = fake.user_name()

        # Generate a unique email address
        while True:
            email = fake.email()
            if email not in generated_emails:
                generated_emails.add(email)
                break

        password = fake.password()
        hashed_password = sha256(password.encode("utf-8")).hexdigest()

        user = User(username=username, email=email, password=hashed_password)
        users.append(user)
    # Create fake dog houses
    dog_houses = []
    for i in range(10):
        name = fake.company()
        location = fake.city()
        description = fake.catch_phrase()

        # Check the price before rounding
        raw_price = random.uniform(20, 200)
        price_per_night = round(raw_price, 2)

        # Relatable descriptions
        descriptions = [
            "Cozy Cottage for Canines",
            "Pampered Pooch Palace",
            "Rustic Retreat for Rovers",
            "Urban Bark Loft",
            "Family-Friendly Fido Farm",
            "Beachside Bungalow for Barking",
            "Peaceful Paws Retreat",
            "Doggy Duplex in the Suburbs",
            "Mountain Hideaway for Hounds",
            "Pet Parent's Paradise",
        ]
        random.shuffle(descriptions)

        description = descriptions.pop()

        image_url = image_urls[i]
        amenities = [
            "Cozy Dog Beds",
            "Food and Water Bowls",
            "Secure Fencing",
            "Dog Toys",
            "Dog-friendly Furniture",
            "Dog Treats",
            "Doggy Door",
            "Outdoor Play Area",
            "Grooming Station",
            "Safety Features",
            "Dog Waste Disposal",
            "Dog-friendly Trails or Parks",
            "Pet-Friendly Neighborhood",
            "Local Vet Information",
            "Dog-sitting Services",
            "Pet Insurance",
            "Pet Spa Services",
            "Doggie Menu",
            "24/7 Emergency Contact",
            "Doggy Cam",
        ]
        random.shuffle(amenities)
        amenities = ", ".join(amenities[: random.randint(5, 15)])

        dog_house = DogHouse(
            name=name,
            location=location,
            description=description,
            price_per_night=price_per_night,
            image_url=image_url,
            amenities=amenities,
            is_booked=random.choice(["Booked", "Available"]),
        )
        dog_houses.append(dog_house)

    # Create fake reviews
    reviews = []
    for user in users:
        for _ in range(random.randint(1, 3)):
            title = fake.catch_phrase()
            body = fake.paragraph()
            rating = random.randint(3, 5)

            # Relatable reviews
            review_texts = [
                "Woof-tastic Stay! 🐾\n\nI recently stayed at the Cozy Cottage and had the most paw-some time! The dog beds were so comfy, and the fenced yard was perfect for my daily zoomies. My humans loved the doggy door - no more waiting for them to open the door for me! I can't wait to come back for another adventure.",
                "Rustic Adventure! 🌲\n\nI'm a real outdoorsy dog, and this Rustic Retreat was just my style. The hiking trails nearby were a blast, and I loved the grooming station for post-hike cleanups. The only thing missing was more squirrels to chase, but I'll be back for sure!",
                "Urban Paw-sibilities! 🌆\n\nOur humans took us to the Urban Bark Loft, and we had a blast exploring the city. The doggy menu was a real treat, and the dog-sitting service meant they could enjoy some human time too. Two paws up!",
                "Family Farm Fun! 🐾\n\nWe had a fantastic time at the Family-Friendly Fido Farm. So much space to run, and all our dog buddies joined us. The vet's contact was handy just in case, but all we needed was a good old-fashioned game of fetch!",
                "Beachside Bliss! 🏖️\n\nI'm a water dog, and this Beachside Bungalow was a dream come true. The private beach was a sandy paradise, and I even got to try out a doggy life vest. The outdoor shower made cleanup a breeze. I can't wait to ride the waves again!",
                "Decent Dog House! 😺\n\nOkay, so I'm not a dog, but I tagged along with my canine companions to the Peaceful Paws Retreat. It was quiet, and the trails were peaceful. I wish they had more cat-friendly options though.",
                "Suburban Serenity! 🏡\n\nWe loved our stay at the Doggy Duplex! Each of us had our own space, and the fenced yard was great for our daily playtime. We even made some new fur-iends in the neighborhood. Highly recommended!",
                "Mountain Majesty! 🏞️\n\nIf you're into hiking, the Mountain Hideaway is the place to be. The trails were breathtaking, and the dog-sitting service was a lifesaver when my humans wanted to tackle the big peaks. A little more playtime with other dogs would have been paw-fect.",
                "Pet Parent's Paradise! 🏰\n\nMy humans were thrilled with this place. Safety gates, a doggy cam, and a pet spa - they were in dog-parent heaven. I got gourmet treats and a comfy bed, so I can't complain. They were even given vet info in case of emergencies. Truly top-notch!",
            ]
            random.shuffle(review_texts)
            review_text = review_texts.pop()

            dog_house = random.choice(dog_houses)
            created_at = fake.date_time_between_dates(
                datetime_start=dog_house.created_at, datetime_end="now"
            )
            review = Review(
                title=title,
                body=review_text,
                rating=rating,
                user=user,
                doghouse=dog_house,
                created_at=created_at,
            )
            reviews.append(review)

    # Add data to the database
    db.session.add_all(users + dog_houses + reviews)
    db.session.commit()
    print("Completed seeding data")
