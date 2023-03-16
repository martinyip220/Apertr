import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalMenuItem from "../OpenModalButton";
import { photosSameTagsThunk } from "../../store/tag";
import "./index.css";
import TagModal from "./tagModal";


function TagCard({ tag, photoId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session?.user);
    const history = useHistory();
    const ownerId = tag.ownerId;

    const handleRedirect = async () => {
        await dispatch(photosSameTagsThunk(tag.tag))
        history.push(`/photos/tags/${tag.tag}`)
    }

    return (
        <div className="single-tag">
            <div onClick={handleRedirect} className="tag-content">{tag.tag}</div>
            <div className="tag-actions">
                {user && user.id === ownerId && (
                    <div>
                        <button className="tag-gear-icon">
                            <OpenModalMenuItem
                                itemText={<i className="fa-solid fa-gear"></i>}
                                modalComponent={
                                    <TagModal
                                        tagId={tag.id}
                                        photoId={photoId}
                                    />
                                }
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TagCard;
