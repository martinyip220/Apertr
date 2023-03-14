import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../OpenModalButton";
import "./index.css";
import TagModal from "./tagModal";


function TagCard({ tag, photoId }) {
    const user = useSelector((state) => state.session?.user);
    const ownerId = tag.ownerId;

    return (
        <div className="single-tag">
            <div className="tag-content">{tag.tag}</div>
            <div className="tag-actions">
                {user && user.id === ownerId && (
                    <div>
                        <button className="tag-gear-icon">
                            <OpenModalMenuItem
                                itemText={<i class="fa-solid fa-gear"></i>}
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
