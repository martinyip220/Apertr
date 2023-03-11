import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  editTagThunk,
  getAllPhotoTagsThunk,
  deleteTagThunk,
} from "../../store/tag";
import "./index.css";

function TagModal({ tagId, photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const photoTags = useSelector((state) => state.tag.photoTags);
  const tagsArr = Object.values(photoTags);
  const currTag = tagsArr.find((tag) => tag.id === tagId);
  const [tag, setTag] = useState(currTag?.tag);
  const id = tagId;

  const handleDelete = async () => {
    await dispatch(deleteTagThunk(tagId));
    await dispatch(getAllPhotoTagsThunk(photoId));

    closeModal();
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const tagData = {
      photoId,
      tag,
      id,
    };

    await dispatch(editTagThunk(tagData));
    await dispatch(getAllPhotoTagsThunk(photoId));

    closeModal();
  };

  return (
    <div>
      <div>
        <div className="edit-del-tag-title">Tag Actions</div>
        <button onClick={closeModal}>
          <i class="fa-solid fa-x"></i>
        </button>
      </div>

      <form className="edit-del-tag-form">
        <label className="edit-del-tag-label">Tag</label>
        <input
          value={tag}
          maxLength="10"
          placeholder="Add a Tag Description"
          className="tag-input"
          onChange={(e) => setTag(e.target.value)}
          required
        />

        <div className="edit-del-tag-btns-ctn">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </form>
    </div>
  );
}

export default TagModal;
