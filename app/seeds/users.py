from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo Lition', username='DemoL', email='demo@aa.io', hashed_password='password')
    martin = User(
        full_name='Martin Yip', username='MartinY', email='Martiny@aa.io', hashed_password='password')
    michelle = User(
        full_name='Michelle Xie', username='MichelleX', email='michellex@aa.io', hashed_password='password')

    db.session.add(demo)
    db.session.add(martin)
    db.session.add(michelle)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
