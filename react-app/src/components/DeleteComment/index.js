import React from "react";
import { useDispatch } from "react-redux";
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
    <div className="del-comment-ctn">
      <div>
        <div className="edit-del-comment-title">Delete Comment</div>
      </div>

      <div className="del-comment-msg">Do you want to permanently delete this comment?</div>

      <div className="del-comment-btn-ctn">
        <button className="del-comment-cancel" onClick={closeModal}>Cancel</button>
        <button
          className="delete-comment-btn"
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
