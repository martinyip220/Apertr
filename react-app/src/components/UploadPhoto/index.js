import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { uploadPhotoThunk } from "../../store/photo";
import "./index.css";

function UploadPhotoForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [photo_img, setPhoto_Img] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPhoto = {
      photo_img,
      description,
    };

    if (photo_img.length < 5) {
      let errors = [];
      errors.push("Photo image url must be greater than 5 characters");
      return setErrors(errors);
    } else {
      const photo = await dispatch(uploadPhotoThunk(newPhoto));
      const photoId = photo.photo.id;

      history.push(`/photos/${photoId}`);
    }

  };

  return (
    <div className="up-photo-bg">
      <div className="upload-form-container">
        <div className="form-top-container">
          <img
            className="logo-auth"
            src="https://i.imgur.com/aRZYLNj.jpg"
            alt="logo"
            onClick={() => history.push("/explore")}
          ></img>
          <div className="form-title">Upload a photo</div>
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
              value={photo_img}
              onChange={(e) => setPhoto_Img(e.target.value)}
              placeholder="Photo Image Url"
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

          <div className="up-photo-btn-containers">
            <div
              className="up-photo-cancel"
              onClick={() => history.push("/explore")}
            >
              Cancel
            </div>
            <button className="up-photo-btn" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPhotoForm;
