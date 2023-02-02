import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateAlbumThunk, getAllAlbumsThunk } from "../../store/album";
import { userPhotosThunk } from "../../store/photo";
import { getOneAlbumThunk } from "../../store/album";
import "./index.css";

function EditAlbumForm() {
  const id = parseInt(useParams()?.albumId);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user?.id);
  const singleAlbum = useSelector((state) => state.album.singleAlbum);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState(singleAlbum?.title);
  const [description, setDescription] = useState(singleAlbum?.description);
  const userPhotos = useSelector((state) => state.photo.userPhotos);
  const userPhotosArr = Object.values(userPhotos);
  let photoSet = new Set();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photos = [...photoSet].join(',')

    const editedAlbum = {
      id,
      title,
      description,
      photos,
    };

    if (photos.length < 1) {
      let errors = [];
      errors.push("Please select at least 1 photo from below");
      return setErrors(errors);
    } else {
      await dispatch(updateAlbumThunk(editedAlbum));

      history.push("/you");
    }
  };

  const selectPhoto = async (photoId) => {

    await photoSet.add(photoId)
  }

  useEffect(async () => {
    await dispatch(getOneAlbumThunk(id));
    await dispatch(getAllAlbumsThunk());
    await dispatch(userPhotosThunk(userId)).then(setLoaded(true));
  }, [dispatch, id, userId]);

  if (!loaded) return null;

  return (
    <div className="up-photo-bg">
      <div className="album-form-container">
        <div className="form-top-container">
          <img
            className="logo-auth"
            src="https://i.imgur.com/aRZYLNj.jpg"
            alt="logo"
            onClick={() => history.push("/explore")}
          ></img>
          <div className="form-title">Edit your album</div>
        </div>

        <form className="album-form" onSubmit={handleSubmit}>
          <div className="album-error-container">
            {errors.map((error, ind) => (
              <div className="album-error-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>

          <div className="up-input-container">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Album Title"
              required
              className="up-photo-modal-input"
            />
          </div>
          <div className="up-input-container">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (Optional)"
              className="up-photo-modal-input"
            />
          </div>
          <div className="album-form-photos-ctn">
            <div className="album-label-btn-container">
              <label className="album-photos-label">Photos</label>
            </div>
            <div className="select-photos-container">
              {userPhotosArr.length < 1 ? (
                <div className="no-photos-uploaded-ctn">
                  <div>You have no photos uploaded.</div>
                  <div>
                    Upload your photo click <Link to="/photos/new">here</Link>{" "}
                  </div>
                </div>
              ) : null}
              {userPhotosArr?.map((photo) => (
                <div className="album-form-photo-btn" key={photo.id}>
                  <img
                    className="album-form-photo-imgs"
                    src={photo.photoImg}
                    onClick={() => selectPhoto(photo.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="album-btn-containers">
            <div
              className="up-photo-cancel"
              onClick={() => history.push("/you")}
            >
              Cancel
            </div>
            <button className="up-photo-btn" type="submit">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAlbumForm;
