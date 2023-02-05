import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePhotoThunk } from "../../store/photo";
import "./index.css";

function DeletePhotoModal({ photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deletePhotoThunk(photoId));

    closeModal();

    history.push("/explore");
  };

  return (
    <div className="delete-photo-modal">
      <div className="delete-photo-title-ctn">
        <div className="up-edit-delete-photo-title">Delete Photo</div>
      </div>


        <div className="delete-photo-descript">
          Do you want to permanently delete this photo?
        </div>


      <div className="delete-btn-container">
        <button className="delete-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="delete-photo-btn"
          onClick={() => {
            if (window.confirm("Deletion can not be undone. Do you wish to continue?")) {
              handleDelete();
            } else {
              closeModal();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeletePhotoModal;
