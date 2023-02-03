import React, { useEffect, useState } from "react";
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


  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

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

  useEffect(() => {
    (async () => {
      let errors = [];
      const btn = await document.getElementById("upload-photo-btn-id")

      if (!isValidUrl(photo_img)) {
        errors.push("Photo image url must start with https:// or http://")
        btn.disabled = true
        btn.className = "errors-btn"
      }

      if (isValidUrl(photo_img)) {
        btn.disabled = false
        btn.className = "up-photo-btn"
      }

      await setErrors(errors)
    })();
  }, [photo_img])


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
          <div className="up-edit-delete-photo-title">Upload a photo</div>
        </div>

        <form className="up-photo-form" onSubmit={handleSubmit}>
          <div className="up-error-ctn">
            {errors.map((error, ind) => (
              <div className="up-error-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>

          <div className="up-input-container">
          <label className="photo-up-edit-label">Photo Image Url <span className="required-label">(Required)</span></label>
            <input
              required
              type="url"
              value={photo_img}
              onChange={(e) => setPhoto_Img(e.target.value)}
              placeholder="http://www.example.com"
              className="up-photo-modal-input"
            />
          </div>
          <div className="up-input-container">
            <label className="photo-up-edit-label">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
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
            <button id="upload-photo-btn-id" className="up-photo-btn" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPhotoForm;
