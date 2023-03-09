from app.models import db, Tag, environment, SCHEMA


def seed_tags():
    demo_tags = [
        Tag(
            user_id=1, photo_id=1, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=2, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=3, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=4, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=5, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=6, tag="Scenery"
        ),
        Tag(
            user_id=1, photo_id=7, tag="Winter"
        ),
        Tag(
            user_id=1, photo_id=8, tag="Winter"
        ),
        Tag(
            user_id=1, photo_id=9, tag="Winter"
        ),
        Tag(
            user_id=1, photo_id=10, tag="Winter"
        ),
        Tag(
            user_id=3, photo_id=11, tag="Places"
        ),
        Tag(
            user_id=3, photo_id=12, tag="Places"
        ),
        Tag(
            user_id=3, photo_id=13, tag="Places"
        ),
        Tag(
            user_id=3, photo_id=14, tag="Places"
        ),
        Tag(
            user_id=3, photo_id=15, tag="Places"
        ),
        Tag(
            user_id=2, photo_id=16, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=17, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=18, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=19, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=20, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=21, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=22, tag="Water"
        ),
        Tag(
            user_id=2, photo_id=23, tag="Water"
        ),
        Tag(
            user_id=3, photo_id=24, tag="Bunny"
        ),
        Tag(
            user_id=3, photo_id=25, tag="Bunny"
        ),
        Tag(
            user_id=3, photo_id=26, tag="Bunny"
        )
    ]

    for tag in demo_tags:
        db.session.add(tag)

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
