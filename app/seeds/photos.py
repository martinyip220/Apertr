from app.models import db, Photo, environment, SCHEMA


def seed_photos():
    demo_photos = [
        Photo(
            user_id=1, album_id=1, photo_img="https://wallpaperaccess.com/full/31192.jpg", description="Take a trip to the point that the sky and sea meets"
        ),
        Photo(
            user_id=1, album_id=1, photo_img="https://wallpaperaccess.com/full/31190.jpg", description="Take a trip to the point that the sky and sea meets"
        ),
        Photo(
            user_id=1, album_id=1, photo_img="https://wallpaperaccess.com/full/31193.jpg", description="Take a trip to the point that the sky and sea meets"
        ),
        Photo(
            user_id=1, album_id=1, photo_img="https://wallpaperaccess.com/full/31196.jpg", description="Take a trip to the point that the sky and sea meets"
        ),
        Photo(
            user_id=1, album_id=1, photo_img="https://wallpaperaccess.com/full/31198.jpg", description="Take a trip to the point that the sky and sea meets"
        ),
        Photo(
            user_id=2, album_id=2, photo_img="https://www.wsupercars.com/wallpapers-regular/Chevrolet/2024-Chevrolet-Corvette-E-Ray-001-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=2, album_id=2, photo_img="https://www.wsupercars.com/wallpapers-regular/Toyota/2023-Toyota-AE86-Concepts-001-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=2, album_id=2, photo_img="https://www.wsupercars.com/wallpapers-regular/Nissan/2024-Nissan-GT-R-Nismo-009-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=3, album_id=3, photo_img="https://wallpapercave.com/wp/wp6427395.jpg", description="My cute bunny pictures!"
        ),
        Photo(
            user_id=3, album_id=3, photo_img="https://wallpapercave.com/wp/wp1916748.jpg", description="My cute bunny pictures!"
        ),
        Photo(
            user_id=3, album_id=3, photo_img="https://wallpapercave.com/wp/wp6427324.jpg", description="My cute bunny pictures!"
        )
    ]

    for photo in demo_photos:
        db.session.add(photo)

    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
