import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  editCommentThunk,
  getAllPhotoCommentsThunk,
} from "../../store/comment";

import "./index.css";

function EditCommentModal({ commentId, photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const photoComments = useSelector((state) => state.comment.photoComments);
  const commentsArr = Object.values(photoComments);
  const currComment = commentsArr.find((comment) => comment.id === commentId);
  const [comment, setComment] = useState(currComment?.comment);
  const id = commentId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      photoId,
      comment,
      id,
    };

    await dispatch(editCommentThunk(commentData));
    await dispatch(getAllPhotoCommentsThunk(photoId));

    closeModal();
  };

  const commentEle = document.getElementById("editComment");
  const counterEle = document.getElementById("editCounter");

  commentEle?.addEventListener("input", function (e) {
    const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = target.getAttribute("maxlength");

    // Count the current number of characters
    const currentLength = target.value.length;

    counterEle.innerHTML = `${currentLength}/${maxLength}`;
  });

  return (
    <div className="edit-del-comment-ctn">
      <div>
        <div className="edit-del-comment-title">Edit Comment</div>
      </div>

      <form className="edit-del-comment-form" onSubmit={handleSubmit}>

        <label className="edit-comment-label">Comment</label>
        <textarea
          value={comment}
          maxLength="200"
          id="editComment"
          placeholder="Add a comment"
          className="comment-textarea"
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="edit-counter-char" id="editCounter"></div>

        <div className="edit-del-comment-btns-ctn">
          <div className="cancel-edit-comment" onClick={closeModal}>Cancel</div>
          <button className="edit-comment-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCommentModal;
