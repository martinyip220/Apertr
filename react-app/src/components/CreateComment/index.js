import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createCommentThunk, getAllPhotoCommentsThunk } from "../../store/comment";
import "./index.css";


function CommentForm({ photoId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            comment,
            photoId
        }

        await dispatch(createCommentThunk(commentData));
        await dispatch(getAllPhotoCommentsThunk(photoId));

        setComment("")

        history.push(`/photos/${photoId}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Add a comment"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <button type="submit">
                    Comment
                </button>
            </form>
        </div>
    )
}


export default CommentForm;
