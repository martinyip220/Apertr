import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  deleteCommentThunk,
  getAllPhotoCommentsThunk,
} from "../../store/comment";

import "./index.css";

function DeleteCommentModal({ commentId, photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteCommentThunk(commentId));
    await dispatch(getAllPhotoCommentsThunk(photoId));

    closeModal();
  };

  return (
    <div>
      <div>
        <div>Delete Comment</div>
      </div>

      <div>Do you want to permanently delete this comment?</div>

      <div>
        <button onClick={closeModal}>Cancel</button>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Deletion can not be undone. Do you wish to continue?"
              )
            ) {
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

export default DeleteCommentModal;
