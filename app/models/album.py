from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .photo import photo_albums


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="album")
    photo = db.relationship("Photo", secondary=photo_albums, back_populates="album")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'user': self.user.to_dict(),
            'photos': [photo.to_dict() for photo in self.photo],
            'photoIds': [photo.id for photo in self.photo],
        }
