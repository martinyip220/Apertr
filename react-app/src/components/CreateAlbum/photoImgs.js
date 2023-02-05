import React, { useState } from "react";
import "./index.css";

function UserPhotosSelect({ addDefaultSrc, selectPhoto, photo, chosen }) {
  const check = chosen?.indexOf(photo.id) !== -1 && chosen !== undefined;

  const [selected, SetSelected] = useState(check);

  const toggleSelected = () => {
    SetSelected(!selected);
  };

  const className = selected
    ? "img-border-selected"
    : "img-border-selected notSelected";

  return (
    <div className="album-form-photo-btn" key={photo.id}>
      <div className={className} onClick={toggleSelected}>
        <img
          onError={addDefaultSrc}
          className="album-form-photo-imgs"
          alt="selected"
          src={photo.photoImg}
          onClick={() => selectPhoto(photo.id)}
        />
      </div>
    </div>
  );
}

export default UserPhotosSelect;
