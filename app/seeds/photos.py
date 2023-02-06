from app.models import db, Photo, Album, environment, SCHEMA


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
            user_id=1, album_id=2, photo_img="https://free4kwallpapers.com/uploads/originals/2022/11/13/winter-wallpaper.jpg", description="The view is unreal!"
        ),
        Photo(
            user_id=1, album_id=2, photo_img="https://wallpapercave.com/wp/wp5081587.jpg", description="Look at the snow covered trees"
        ),
        Photo(
            user_id=1, album_id=2, photo_img="https://images.hdqwalls.com/wallpapers/winter-snow-nature-4k-ej.jpg", description="Winter magic"
        ),
        Photo(
            user_id=1, album_id=2, photo_img="https://i.pinimg.com/originals/d3/f0/bd/d3f0bd0555d520d1d82045f1c6fc3724.jpg", description="winter lights"
        ),
        Photo(
            user_id=1, album_id=2, photo_img="https://c4.wallpaperflare.com/wallpaper/924/106/356/5bd0add530baf-wallpaper-preview.jpg", description="the northern lights"
        ),
        Photo(
            user_id=1, album_id=3, photo_img="https://free4kwallpapers.com/uploads/originals/2018/10/18/japanese-sunset-wallpaper.jpg", description="Japanese street!"
        ),
        Photo(
            user_id=1, album_id=3, photo_img="https://free4kwallpapers.com/uploads/originals/2020/02/25/city-landscape-wallpaper.jpg", description="Empire state of mind"
        ),
        Photo(
            user_id=1, album_id=3, photo_img="https://free4kwallpapers.com/uploads/originals/2019/12/06/night-fireworks-at-the-eiffel-tower-in-paris-france-wallpaper.jpg", description="Eiffel tower!"
        ),
        Photo(
            user_id=1, album_id=3, photo_img="https://free4kwallpapers.com/uploads/originals/2015/10/11/gwangan-bridge-south-korea-wallpaper.jpg", description="Korea!"
        ),
        Photo(
            user_id=1, album_id=3, photo_img="https://free4kwallpapers.com/uploads/originals/2020/04/30/london-bridge-wallpaper.png", description="London Bridge"
        ),
        Photo(
            user_id=1, album_id=4, photo_img="https://free4kwallpapers.com/uploads/originals/2022/12/25/walk-on-the-beach-wallpaper.jpg", description="Look at that pier!"
        ),
        Photo(
            user_id=1, album_id=4, photo_img="https://free4kwallpapers.com/uploads/originals/2020/09/21/buaq-beach-kuta-bali-indonesia-wallpaper.jpg", description="low tide!"
        ),
        Photo(
            user_id=1, album_id=4, photo_img="https://free4kwallpapers.com/uploads/originals/2020/08/07/scenic-view-of-beach-during-dawn-wallpaper.jpg", description="A beautiful day"
        ),
        Photo(
            user_id=1, album_id=4, photo_img="https://free4kwallpapers.com/uploads/originals/2015/12/30/waimano-falls-hawaii-wallpaper.jpg", description="Simply magic, short hike from the beach!"
        ),
        Photo(
            user_id=1, album_id=4, photo_img="https://free4kwallpapers.com/uploads/originals/2015/11/12/morning-beach-wallpaper.jpg", description="Unreal steadiness"
        ),
        Photo(
            user_id=2, album_id=5, photo_img="https://www.wsupercars.com/wallpapers-regular/Chevrolet/2024-Chevrolet-Corvette-E-Ray-001-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=2, album_id=5, photo_img="https://www.wsupercars.com/wallpapers-regular/Toyota/2023-Toyota-AE86-Concepts-001-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=2, album_id=5, photo_img="https://www.wsupercars.com/wallpapers-regular/Nissan/2024-Nissan-GT-R-Nismo-009-1080.jpg", description="This is a my dream car collection. Take a look!"
        ),
        Photo(
            user_id=3, album_id=6, photo_img="https://wallpapercave.com/wp/wp6427395.jpg", description="My cute bunny pictures!"
        ),
        Photo(
            user_id=3, album_id=6, photo_img="https://wallpapercave.com/wp/wp1916748.jpg", description="My cute bunny pictures!"
        ),
        Photo(
            user_id=3, album_id=6, photo_img="https://wallpapercave.com/wp/wp6427324.jpg", description="My cute bunny pictures!"
        )
    ]

    for photo in demo_photos:
        album = Album.query.get(photo.album_id)
        photo.album.append(album)
        db.session.add(photo)

    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
