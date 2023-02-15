from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Comment
from ..forms import CommentForm
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint("comments", __name__)


#get all comments
@comment_routes.route("")
def all_comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}, 200

# Create a comment
@comment_routes.route("", methods=["POST"])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            user=current_user, photo_id=form.data["photoId"], comment=form.data["comment"]
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# GET / EDIT / DELETE comment
@comment_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def comment_action(id):
    comment = Comment.query.get(id)

    if comment:

        if request.method == "GET":
            comment_dict = comment.to_dict()
            return comment_dict

        if request.method == "PUT":
            form = CommentForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                comment.comment = form.data["comment"]

                db.session.commit()
                return {"comment": comment.to_dict()}, 201
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400

        if request.method == "DELETE":
            db.session.delete(comment)
            db.session.commit()
            return ({
                'message': 'Comment successfully deleted',
                'status_code': 200
            }), 200

    else:
        return {'errors': 'Comment not found'}, 404
