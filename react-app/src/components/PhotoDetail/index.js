import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePhotoThunk, getAllPhotosThunk } from "../../store/photo";
import { getAllUsers } from "../../store/session";
import "./index.css";

function PhotoDetail() {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const users = useSelector((state) => state.session.allUsers?.users);
  const singlePhoto = useSelector((state) => state.photo.singlePhoto);
  const ownerId = singlePhoto?.userId;

  const ownerObj = users.filter((user) => user?.id === ownerId)

  console.log("what am i ?", ownerObj[0])

  const ownerName = ownerObj[0]?.username


  console.log("owner username", ownerName)

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
          <img src={singlePhoto.photoImg} alt="single" width={1000}></img>
        </div>
        <div>
          <button>Edit Photo</button>
        </div>
      </div>

      <div className="photo-detail-info">
        <div>{ownerName}</div>
        <div>{singlePhoto.description}</div>
      </div>
    </div>
  );
}

export default PhotoDetail;
