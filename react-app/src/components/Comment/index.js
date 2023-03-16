import React from "react";
import { useSelector } from "react-redux";
import DeleteCommentModal from "../DeleteComment";
import EditCommentModal from "../EditComment";
import OpenModalMenuItem from "../OpenModalButton";
import "./index.css";

function CommentCard({ comment, photoId }) {
  const user = useSelector((state) => state.session?.user);
  const ownerId = comment.ownerId;
  const date = new Date(comment.createdAt).toDateString();

  return (
    <div className="comment-card-ctn">
      <div className="comment-author-created">
        <div className="comment-author-date-ctn">
          <div className="comment-author">{comment.author}</div>
          <div className="comment-date">{date}</div>
        </div>
        <div className="comment-auth-btns">
          {user && user.id === ownerId && (
            <div>
              <button className="comment-icon-btns">
                <OpenModalMenuItem
                  itemText={<i className="fa-solid fa-pen-to-square"></i>}
                  modalComponent={
                    <EditCommentModal
                      commentId={comment.id}
                      photoId={photoId}
                    />
                  }
                />
              </button>
              <button className="comment-icon-btns">
                <OpenModalMenuItem
                  itemText={<i className="fa-regular fa-trash-can"></i>}
                  modalComponent={
                    <DeleteCommentModal
                      commentId={comment.id}
                      photoId={photoId}
                    />
                  }
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="comment-div">{comment.comment}</div>
    </div>
  );
}

export default CommentCard;
