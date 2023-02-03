import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userPhotosThunk } from "../../store/photo";
import { createAlbumThunk } from "../../store/album";
import "./index.css";

function AlbumForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const userId = useSelector((state) => state.session.user?.id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userPhotos = useSelector((state) => state.photo.userPhotos);
  const userPhotosArr = Object.values(userPhotos);
  let photoSet = new Set();

  function addDefaultSrc(e) {
    e.target.src =
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
  }

  useEffect(() => {
    (async () => {
      let errors = [];
      const btn = await document.getElementById("testing")

      if (title.length > 20) {
        errors.push("Title must be less than 20 characters");
        btn.disabled = true
        btn.className = "errors-btn"
      }
      if (description.length > 100) {
        errors.push("Description must be less than 100 characters");
        btn.disabled = true
        btn.className = "errors-btn"
      }

      if (title.length <= 20 && description.length <= 100) {
        btn.disabled = false
        btn.className = "up-photo-btn"
      }

      await setErrors(errors);
      console.log("i am the current title and description errors", errors)

    })();
  }, [title, description]);

  useEffect(() => {
    (async () => {
      console.log("i am the photoset", photoSet)
    })();
  }, [photoSet])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photos = [...photoSet].join(",");

    const newAlbum = {
      title,
      description,
      photos,
    };

    if (photos.length < 1 && errors.length) {
      let errors = [];
      errors.push("Please select at least 1 photo from below")
      return setErrors(errors);

    } else {
      await dispatch(createAlbumThunk(newAlbum));

      history.push("/you");
    }
  };
  const selectPhoto = (photoId) => {
    photoSet.add(photoId);

    console.log("i am the set of selected photos", photoSet)
  };

  useEffect(() => {
    dispatch(userPhotosThunk(userId));
  }, [dispatch]);

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
          <div className="create-edit-album-title">Create an album</div>
        </div>

        <form className="album-form" onSubmit={handleSubmit}>
          <div className="album-error-container">
            {errors.map((error, ind) => (
              <div className="auth-error-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>

          <div className="up-input-container">
            <label className="photo-up-edit-label">
              Album Title <span className="required-label">(Required)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Required"
              required
              className="up-photo-modal-input"
            />
          </div>
          <div className="up-input-container">
            <label className="photo-up-edit-label">Album Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
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
                    onError={addDefaultSrc}
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
            <button id="testing" className="up-photo-btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlbumForm;
