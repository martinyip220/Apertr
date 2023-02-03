import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOneAlbumThunk } from "../../store/album";
import { deleteAlbumThunk } from "../../store/album";
import "./index.css";

const AlbumCard = ({ albumId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userAlbumsObj = useSelector((state) => state.album.userAlbums);
  const userAlbumsArr = Object.values(userAlbumsObj);
  const currentAlbum = userAlbumsArr.filter((album) => album.id === albumId)[0];
  const albumPhotos = currentAlbum.photos;

  function addDefaultSrc(e) {
    e.target.src = "https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg";
  }

  const handleRedirect = async (id) => {
    await dispatch(getOneAlbumThunk(id));

    return history.push(`/albums/${id}/edit`);
  };

  const handleDelete = async () => {
    await dispatch(deleteAlbumThunk(albumId));

    history.push("/you");
  };

  return (
    <div className="album-card-ctn">
      <div className="album-img-margin">
        <Link to={`/albums/${albumId}`} className="album-detail-link">
          <img
            onError={addDefaultSrc}
            className="album-img"
            src={
              albumPhotos.length
                ? albumPhotos[0]?.photoImg
                : "https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg"
            }
          ></img>
        </Link>
      </div>
      <div className="album-actions">
        <div className="album-title">{currentAlbum.title}</div>
        <div className="album-edit-delete-btn-ctn">
          <i
            className="fa-solid fa-pen-to-square edit-album-btn"
            onClick={() => handleRedirect(currentAlbum.id)}
          ></i>
          <i
            className="fa-regular fa-trash-can delete-album-btn"
            onClick={() => {
              if (
                window.confirm(
                  "Deletion can not be undone. The album's photos will not be deleted. Continue?"
                )
              ) {
                handleDelete();
              } else {
                history.push("/you");
              }
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
