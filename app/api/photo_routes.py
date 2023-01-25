from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Photo, Album
from ..forms import PhotoForm
from .auth_routes import validation_errors_to_error_messages


photo_routes = Blueprint("photos", __name__)


#get all photos
@photo_routes.route("")
def all_photos():
    photos = Photo.query.all()
    return {"photos": [photo.to_dict() for photo in photos]}, 200


#upload new photo
@photo_routes.route("/new", methods=["POST"])
def upload_photo():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_photo = Photo(
            user=current_user,
            photo_img=form.data["photo_img"],
            description=form.data["description"],
            )
        db.session.add(new_photo)
        if (form.data['album']):
            album = Album.query.get(form.data['album'])
            album.photo.append(new_photo)
            db.session.commit()
            return {"photo": new_photo.to_dict()}, 201
        else:
            db.session.commit()
            return {"photo": new_photo.to_dict()}, 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# GET / EDIT / DELETE photo
@photo_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def photo_action(id):
    photo = Photo.query.get(id)

    if photo:

        if request.method == "GET":
            photo_dict = photo.to_dict()
            return photo_dict

        if request.method == "PUT":
            form = PhotoForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                photo.photo_img = form.data['photo_img']
                photo.description = form.data['description']

                if (form.data['album']):
                    album = Album.query.get(form.data['album'])
                    album.photo.append(photo)
                    db.session.commit()

                db.session.commit()
                return {"photo": photo.to_dict()}, 200
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400

        if request.method == "DELETE":
            db.session.delete(photo)
            db.session.commit()
            return ({
                'message': 'Photo successfully deleted',
                'status_code': 200
            }), 200

    else:
        return {'errors': 'Photo not found'}, 404


#All user images
@photo_routes.route('/user/<int:id>')
def all_user_photos(id):

    photos = Photo.query.filter_by(user_id=id).all()

    if photos:
        return {photo.id: photo.to_dict() for photo in photos}, 200
    else:
        return {'errors': 'User not found'}, 404
