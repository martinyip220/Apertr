import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAlbumsThunk, getOneAlbumThunk } from "../../store/album";
import { getAllPhotosThunk } from "../../store/photo";

import "./index.css";

function AlbumPage() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const id = parseInt(albumId);
  const currentAlbum = useSelector((state) => state.album.singleAlbum);
  const photos = useSelector((state) => state.album.singleAlbum.photos);
    const owner = useSelector((state) => state.session.user.full_name);
    const allPhotos = useSelector((state) => state.photo.allPhotos.photos);

    console.log(allPhotos)
    console.log(photos)

    const filteredPhotos = []

  const currAlb = Object.values(currentAlbum);
    const albumPhotos = currAlb[2];




//   console.log("what am id????????", albumPhotos);

    useEffect(async () => {
        // await dispatch(getAllPhotosThunk());
    await dispatch(getAllAlbumsThunk());
      await dispatch(getOneAlbumThunk(id));
      await setLoaded(true)
  }, [dispatch, id]);

  if (!loaded) return null;

  return (
    <div className="album-pg-whole">
      <div className="album-pg-background-top">
        <div>{currentAlbum.title}</div>
        <div>{currentAlbum.description}</div>
        <div>By: {owner}</div>
      </div>
      {/* <div className="single-album-photos-ctn">
        {loaded && photos.map((photo) => {
          <div key={photo.id}>
            <img src={photo.photoImg} alt="album-img">
              hello
            </img>
          </div>;
        })}
      </div> */}
    </div>
  );
}

export default AlbumPage;
