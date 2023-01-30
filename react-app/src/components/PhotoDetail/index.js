import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePhotoThunk, getAllPhotosThunk } from "../../store/photo";
import { getAllUsers } from "../../store/session";
import EditPhotoModal from "../EditPhoto";
import DeletePhotoModal from "../DeletePhoto";
import OpenModalMenuItem from "../OpenModalButton";
import "./index.css";

function PhotoDetail() {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const singlePhoto = useSelector((state) => state.photo.singlePhoto);
  const user = useSelector((state) => state.session.user);
  const ownerId = singlePhoto.userId;

  useEffect(async () => {
    await dispatch(getAllUsers());
    await dispatch(getAllPhotosThunk());
    await dispatch(getOnePhotoThunk(photoId));
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="photo-detail-page">
      <div className="photo-detail-img-background">
        <div className="photo-detail-img-container">
          <img src={singlePhoto.photoImg} alt="single" className="single-photo"></img>
        </div>
        <div className="photo-detail-options">
          {user && user.id === ownerId && (
            <div>
              <button className="photo-detail-btns">
                <OpenModalMenuItem
                  itemText={<i className="fa-solid fa-pen-to-square"></i>}
                  modalComponent={<EditPhotoModal photoId={photoId} />}
                />
              </button>
              <button className="photo-detail-btns">
                <OpenModalMenuItem
                  itemText={<i className="fa-regular fa-trash-can"></i>}
                  modalComponent={<DeletePhotoModal photoId={photoId} />}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="photo-detail-info">
        <div></div>
        <div>{singlePhoto.description}</div>
      </div>
    </div>
  );
}

export default PhotoDetail;
