import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotoCommentsThunk } from "../../store/comment";
import DeleteCommentModal from "../DeleteComment";
import EditCommentModal from "../EditComment";
import OpenModalMenuItem from "../OpenModalButton";
import "./index.css";

function CommentCard({ comment, photoId }) {
    const dispatch = useDispatch();
    const date = (new Date(comment.createdAt)).toDateString();

    return (
        <div className="comment-card-ctn">
            <div className="comment-author-created">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-date">{date}</div>
                <div>
                    <button>
                        <OpenModalMenuItem
                            itemText={<i className="fa-solid fa-pen-to-square"></i>}
                            modalComponent={<EditCommentModal commentId={comment.id} photoId={photoId}/>}
                        />
                    </button>
                    <button>
                        <OpenModalMenuItem
                            itemText={<i className="fa-regular fa-trash-can"></i>}
                            modalComponent={<DeleteCommentModal commentId={comment.id} photoId={photoId}/>}
                        />
                    </button>
                </div>
            </div>
            <div>{comment.comment}</div>
        </div>
    )
}

export default CommentCard;
