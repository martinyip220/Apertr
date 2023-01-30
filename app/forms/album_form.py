from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    photo = StringField("Photos")
