from app.models import db, Album, environment, SCHEMA


def seed_albums():
    demo_albums = [
        Album(
            user_id=1, title="World's Great Beauty", description="Take a peek around the world!"
        ),
        Album(
            user_id=1, title="Snowy Mountain Adventure!", description="Wow it's like a winter wonderland here!"
        ),
        Album(
            user_id=1, title="World Travel Destinations", description="I want to visit all these beautiful places!"
        ),
        Album(
            user_id=1, title="Best Beaches Locations!", description="I can still remember the breeze and that sunshine!"
        ),
        Album(
            user_id=2, title="The best car collection", description="More than just from A to B!"
        ),
        Album(
            user_id=3, title="Cutest Animal", description="How can anyone not love bunnies?"
        )
    ]

    for album in demo_albums:
        db.session.add(album)

    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
