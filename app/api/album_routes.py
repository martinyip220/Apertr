from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Album, Photo
from ..forms import AlbumForm
from .auth_routes import validation_errors_to_error_messages

album_routes = Blueprint("albums", __name__)


#get all user albums
@album_routes.route('/user/<int:id>')
def get_user_albums(id):

    albums = Album.query.filter_by(user_id=id).all()

    if albums:
        return {album.id: album.to_dict() for album in albums}, 200
    else:
        return {'errors:': 'Album not found'}, 404


# Create an album
@album_routes.route('', methods=["POST"])
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_album = Album(
            user=current_user, title=form.data["title"], description=form.data["description"]
        )
        db.session.add(new_album)
        if (form.data['photo']):
            photos = form.data["photo"].split(",")
            photo_list = []
            [photo_list.append(Photo.query.get(int(photo))) for photo in photos]
            [new_album.photo.append(photo) for photo in photo_list]
            db.session.commit()
            return {"album": new_album.to_dict()}, 201
        else:
            db.session.commit()
            return {"album": new_album.to_dict()}, 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# GET / EDIT / DELETE album
@album_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def album_action(id):
    album = Album.query.get(id)

    if album:

        if request.method == "GET":
            album_dict = album.to_dict()
            return album_dict

        if request.method == "PUT":
            form = AlbumForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                album.title = form.data["title"]
                album.description = form.data["description"]

                if(form.data["photo"] != ""):
                    photos = form.data["photo"].split(",")
                    photo_list = []
                    [photo_list.append(Photo.query.get(int(photo))) for photo in photos]
                    [album.photo.remove(photo) for photo in photo_list]

                db.session.commit()
                return {"album": album.to_dict()}, 200
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400

        if request.method == "DELETE":
            db.session.delete(album)
            db.session.commit()
            return ({
                'message': 'Album successfully deleted',
                'status_code': 200
            }), 200

    else:
        return {'errors': 'Album not found'}, 404
