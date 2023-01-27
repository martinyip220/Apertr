import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePhotoThunk } from "../../store/photo";
import "./index.css";

function DeletePhotoModal({ photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDelete = async () => {

    await dispatch(deletePhotoThunk(photoId))

    closeModal();

    history.push("/explore")
  }

  return (
    <div className="delete-server-modal">
      <div className="create-server-top-container">
        <h1 className="create-server-h1">Delete your Photo</h1>
        <div className="description-container">
          <div className="create-server-descript">
            Do you want to permanently delete this photo?
          </div>
        </div>
      </div>

      <div className="delete-photo-btn-container">
        <button className="delete-cancel" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="delete-photo-btn"
          onClick={() => {
            if (window.confirm("Delete the photo?")) {
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
