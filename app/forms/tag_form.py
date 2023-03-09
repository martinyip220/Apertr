from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class TagForm(FlaskForm):
    photoId = IntegerField("PhotoId")
    tag = StringField("Tag", validators=[DataRequired()])
