import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  updatePhotoThunk,
  getOnePhotoThunk,
  getAllPhotosThunk,
} from "../../store/photo";
import "./index.css";

function EditPhotoModal({ photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const singlePhoto = useSelector((state) => state.photo.singlePhoto);
  const [photo_img, setPhoto_Img] = useState(singlePhoto?.photoImg);
  const [description, setDescription] = useState(singlePhoto?.description);
  //   const [album, setAlbum] = useState(singlePhoto?.album);
  const id = photoId;

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

    const photoData = {
      id,
      photo_img,
      description,
    };

    if (photo_img.length < 5) {
      let errors = [];
      errors.push("Photo image url must be greater than 5 characters");
      return setErrors(errors);
    } else {
      await dispatch(updatePhotoThunk(photoData));
      await dispatch(getAllPhotosThunk());
      await dispatch(getOnePhotoThunk(photoId));

      closeModal();
    }
  };

  useEffect(() => {
    (async () => {
      let errors = [];
      const btn = await document.getElementById("edit-photo-btn-id")

      if (!isValidUrl(photo_img)) {
        errors.push("Photo image url must start with https:// or http://")
        btn.disabled = true
        btn.className = "errors-btn"
      }

       if (description.length > 151) {
        errors.push("Description is limited to 150 characters");
        btn.disabled = true
        btn.className = "errors-btn"
      }

      if (isValidUrl(photo_img) && description.length < 151) {
        btn.disabled = false
        btn.className = "up-photo-btn"
      }

      await setErrors(errors)
    })();
  }, [photo_img, description])


  return (
    <div className="edit-photo-modal">
      <div className="edit-photo-top">
        <div className="edit-del-photo-title">Edit Photo</div>
      </div>

      <form className="edit-photo-form" onSubmit={handleSubmit}>
        <ul className="edit-photo-error-container">
          {errors.map((error, idx) => (
            <li className="edit-modal-errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label className="photo-up-edit-label">Photo Image Url <span className="required-label">(Required)</span></label>
        <input
          type="url"
          value={photo_img}
          placeholder="http://www.example.com"
          onChange={(e) => setPhoto_Img(e.target.value)}
          required
          className="edit-photo-modal-input"
        />
        <label className="photo-up-edit-label">Description</label>
        <input
          type="text"
          value={description}
          placeholder="Optional"
          onChange={(e) => setDescription(e.target.value)}
          className="edit-photo-modal-input"
        />

        <div className="edit-photo-btn-containers">
          <div className="edit-photo-cancel" onClick={closeModal}>
            Cancel
          </div>
          <button id="edit-photo-btn-id" className="edit-photo-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPhotoModal;
