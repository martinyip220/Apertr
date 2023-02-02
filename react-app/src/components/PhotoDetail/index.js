import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePhotoThunk, getAllPhotosThunk } from "../../store/photo";
import { getAllUsers } from "../../store/session";
import EditPhotoModal from "../EditPhoto";
import DeletePhotoModal from "../DeletePhoto";
import OpenModalMenuItem from "../OpenModalButton";
import profilePic from "../../assets/profile-img.jpg";
import "./index.css";

function PhotoDetail() {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const id = Number(photoId)
  const [loaded, setLoaded] = useState(false);
  const singlePhoto = useSelector((state) => state.photo.singlePhoto);
  const user = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.allUsers);
  const ownerId = singlePhoto.userId;

  useEffect(async () => {
    await dispatch(getAllPhotosThunk());
    await dispatch(getOnePhotoThunk(id));
    await dispatch(getAllUsers()).then(setLoaded(true));
  }, [dispatch]);

  console.log("i am ownerId", ownerId);
  console.log("allusers", allUsers);

  if (allUsers && singlePhoto) {
    let usersArr = Object.values(allUsers);
    let owner = usersArr.find((user) => user.id === ownerId);

    console.log("hopefully i am the ownwer?", owner);
  }

  if (!loaded) return null;

  return (
    <div className="photo-detail-page">
      <div className="photo-detail-img-background">
        <div className="photo-detail-img-container">
          <img
            src={singlePhoto.photoImg}
            alt="single"
            className="single-photo"
          ></img>
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

      <div className="photo-detail-bottom-ctn">
        <div className="photo-detail-info-ctn">
          <div className="profile-pic-photo-info-ctn">
            <img src={profilePic}></img>
            <div className="owner-photo-info">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
