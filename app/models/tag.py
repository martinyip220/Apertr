from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
    tag = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="tag")
    photo = db.relationship("Photo", back_populates="tag")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.user_id,
            'photoId': self.photo_id,
            'tag': self.tag,
            'createdAt': self.created_at
        }
