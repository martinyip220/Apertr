from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Tag
from ..forms import TagForm
from .auth_routes import validation_errors_to_error_messages


tag_routes = Blueprint("tags", __name__)

#get all tags
@tag_routes.route("")
def all_tags():
    tags = Tag.query.all()
    return {"tags": [tag.to_dict() for tag in tags]}, 200

#Create a Tag
@tag_routes.route("", methods=["POST"])
@login_required
def create_tag():
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_tag = Tag(
            user=current_user, photo_id=form.data["photoId"], tag=form.data["tag"]
        )

        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict(), 201

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# GET / EDIT / DELETE Tag
@tag_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def tag_action(id):
    tag = Tag.query.get(id)

    if tag:

        if request.method == "GET":
            tag_dict = tag.to_dict()
            return tag_dict

        if request.method == "PUT":
            form = TagForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                tag.tag = form.data["tag"]

                db.session.commit()
                return {"tag": tag.to_dict()}, 201
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400

        if request.method == "DELETE":
            db.session.delete(tag)
            db.session.commit()
            return ({
                'message': 'Tag successfully deleted',
                'status_code': 200
            }), 200

    else:
        return {'errors': 'Tag not found'}, 404
