from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class PhotoForm(FlaskForm):
    photo_img = StringField("Image Url", validators=[DataRequired()])
    description = StringField("Description")
    album = IntegerField("Album")
    submit = SubmitField("Upload Photo")
