import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAllAlbumsThunk,
  userAlbumsThunk,
  getOneAlbumThunk,
} from "../../store/album";
import { deleteAlbumThunk, updateAlbumThunk } from "../../store/album";
import EditAlbumForm from "../EditAlbum";
import "./index.css";

const AlbumCard = ({ albumId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userAlbumsObj = useSelector((state) => state.album.userAlbums);
  const userAlbumsArr = Object.values(userAlbumsObj);
  const currentAlbum = userAlbumsArr.filter((album) => album.id === albumId)[0];
  const albumPhotos = currentAlbum.photos;

  const handleDelete = async () => {

    await dispatch(deleteAlbumThunk(albumId));

    history.push("/you");
  };

  return (
    <div className="album-card-ctn">
      <div>
        <Link to={`/albums/${albumId}`} className="album-detail-link">
          <img className="album-img" src={albumPhotos[0]?.photoImg || "hello"}></img>
        </Link>
      </div>
      <div className="album-actions">
        <div className="album-title">
          {currentAlbum.title}
        </div>
        <div className="album-edit-delete-btn-ctn">
          <i className="fa-solid fa-pen-to-square edit-album-btn"
            onClick={() => {
              history.push(`/albums/${currentAlbum.id}/edit`)
            }}
          ></i>
          <i
            className="fa-regular fa-trash-can delete-album-btn"
            onClick={() => {
              if (window.confirm("Deletion can not be undone. The album's photos will not be deleted. Continue?")) {
                handleDelete()
              } else {
                history.push("/you")
              }
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
