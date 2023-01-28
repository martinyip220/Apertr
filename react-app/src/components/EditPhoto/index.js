import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  updatePhotoThunk,
  getOnePhotoThunk,
  getAllPhotosThunk,
} from "../../store/photo";
import { getAllUsers } from "../../store/session";
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

        <input
          type="text"
          value={photo_img}
          onChange={(e) => setPhoto_Img(e.target.value)}
          required
          className="edit-photo-modal-input"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="edit-photo-modal-input"
        />

        <div className="edit-photo-btn-containers">
          <div className="edit-photo-cancel" onClick={closeModal}>
            Cancel
          </div>
          <button className="edit-photo-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPhotoModal;
