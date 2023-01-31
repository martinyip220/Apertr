import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAllAlbumsThunk,
  userAlbumsThunk,
  getOneAlbumThunk,
} from "../../store/album";
import { deleteAlbumThunk } from "../../store/album";
import "./index.css";

const AlbumCard = ({ albumId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userAlbumsObj = useSelector((state) => state.album.userAlbums);
  const userAlbumsArr = Object.values(userAlbumsObj);
  const currentAlbum = userAlbumsArr.filter((album) => album.id === albumId)[0];
  const albumPhotos = currentAlbum.photos;

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteAlbumThunk(albumId));

    history.push("/you");
  };

  return (
    <div className="album-card-ctn">
      <div>
        <Link to={`/albums/${albumId}`} className="album-detail-link">
          <img className="album-img" src={albumPhotos[0].photoImg}></img>
        </Link>
      </div>
      <div className="album-actions">
        <div className="album-title">
          {currentAlbum.id}
          {currentAlbum.title}
        </div>
        <div className="album-edit-delete-btn-ctn">
          <i
            className="fa-regular fa-trash-can delete-album-btn"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
