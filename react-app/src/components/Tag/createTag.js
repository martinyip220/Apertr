import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllPhotoTagsThunk, createTagThunk } from "../../store/tag";
import "./index.css";

function CreateTagModal({ photoId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [tag, setTag] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const tagData = {
      photoId,
      tag,
    };

    await dispatch(createTagThunk(tagData));
    await dispatch(getAllPhotoTagsThunk(photoId));

    closeModal();
  };

  return (
    <div className="tag-modal-ctn">
      <div className="tag-title-ctn">
        <div className="edit-del-tag-title">Create a Tag</div>
        <button className="tag-cancel" onClick={closeModal}>
          <i className="fa-solid fa-x tag-cancel-x"></i>
        </button>
      </div>

      <form className="edit-del-tag-form">
        <div className="tag-limit">*Tags max 10 characters</div>
        <div className="tag-label-desc">
          <label className="edit-del-tag-label">Tag:</label>
          <input
            value={tag}
            maxLength="10"
            placeholder="Add a Tag Description"
            className="tag-input"
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>

        <div className="create-tag-btns-ctn">
          <button className="edit-tag-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTagModal;
