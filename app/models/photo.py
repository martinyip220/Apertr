from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

photo_albums = db.Table(
    "photo_albums",
    db.Model.metadata,
    db.Column("photo_id", db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), primary_key=True),
    db.Column("album_id", db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), primary_key=True)
)

if environment == "production":
    photo_albums.schema = SCHEMA


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    photo_img = db.Column(db.String(2000), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="photo")
    album = db.relationship("Album", secondary=photo_albums ,back_populates="photo")
    comment = db.relationship("Comment", back_populates="photo")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'albumId': self.album_id,
            'photoImg': self.photo_img,
            'description': self.description,
            'createdAt': self.created_at
        }
