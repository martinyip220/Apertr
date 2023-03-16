import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCommentThunk,
  getAllPhotoCommentsThunk,
} from "../../store/comment";
import "./index.css";

function CommentForm({ photoId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");

  const commentEle = document.getElementById("comment");
  const counterEle = document.getElementById("counter");

  commentEle?.addEventListener("input", function (e) {
    const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = target.getAttribute("maxlength");

    // Count the current number of characters
    const currentLength = target.value.length;

    counterEle.innerHTML = `${currentLength}/${maxLength}`;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      comment,
      photoId,
    };

    await dispatch(createCommentThunk(commentData));
    await dispatch(getAllPhotoCommentsThunk(photoId));

    setComment("");

    history.push(`/photos/${photoId}`);
  };

  return (
    <div className="create-comment-form">
      <form  onSubmit={handleSubmit}>
        <textarea
          className="textarea-comment"
          maxLength="200"
          id="comment"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="under-comment-info">
          <div className="counter-char" id="counter"></div>
          <button className="comment-submit-btn" type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
