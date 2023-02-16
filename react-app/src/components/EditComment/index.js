import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editCommentThunk, getAllPhotoCommentsThunk } from "../../store/comment";

import "./index.css";

function EditCommentModal({ commentId, photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const photoComments = useSelector((state) => state.comment.photoComments);
    const commentsArr = Object.values(photoComments);
    const currComment = commentsArr.find((comment) => comment.id === commentId)
    const [comment, setComment] = useState(currComment?.comment);
    const id = commentId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            photoId,
            comment,
            id
        }

        await dispatch(editCommentThunk(commentData))
        await dispatch(getAllPhotoCommentsThunk(photoId))

        closeModal();
    }


    return (
        <div>
            <div>
                <div>Edit Comment</div>
            </div>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>
                            {error}
                        </li>
                    ))}
                </ul>

                <label>Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />

                <div>
                    <div onClick={closeModal}>
                        Cancel
                    </div>
                    <button type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}


export default EditCommentModal;
