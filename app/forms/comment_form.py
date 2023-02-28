from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    photoId = IntegerField("PhotoId")
    comment = StringField("Comment", validators=[DataRequired()])
