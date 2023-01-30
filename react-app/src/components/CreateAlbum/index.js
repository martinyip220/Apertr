import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink, Link } from "react-router-dom";
import { userPhotosThunk } from "../../store/photo";
import { createAlbumThunk } from "../../store/album";
import "./index.css";

function AlbumForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const userId = useSelector((state) => state.session.user.id);
  const [description, setDescription] = useState("");
  const userPhotos = useSelector((state) => state.photo.userPhotos);
  const userPhotosArr = Object.values(userPhotos);
  let photoArr = [];

    // const photos = photo;
    // const values = Object.values(photos)

//   console.log("i am outside the handle submit", photos);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const photos = Array.from(photo).join();

      const newAlbum = {
          title,
          description,
          photos
      }

      if (photos.length < 1) {
          let errors = [];
          errors.push("Please select at least 1 photo from below");
          return setErrors(errors)
      } else {
          await dispatch(createAlbumThunk(newAlbum))

          history.push("/you")
      }
  };

  const handleSelect = async (e) => {
    e.preventDefault();

    await setPhoto(photoArr);
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
          <div className="form-title">Create an album</div>
        </div>

        <form className="up-photo-form" onSubmit={handleSubmit}>
          <div className="auth-error-container">
            {errors.map((error, ind) => (
              <div className="auth-error-msg" key={ind}>
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
            <label>Photos</label>
            <button onClick={handleSelect}>Add to Album</button>
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
                <div className="album-form-photo-btn">
                  <img
                    className="album-form-photo-imgs"
                    src={photo.photoImg}
                    onClick={() => photoArr.push(photo.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="up-photo-btn-containers">
            <div
              className="up-photo-cancel"
              onClick={() => history.push("/explore")}
            >
              Cancel
            </div>
            <button className="up-photo-btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlbumForm;
