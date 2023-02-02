import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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

  const stateee = useSelector((state) => {
    return state;
  });

  console.log("im the currentalbum", currentAlbum);
  console.log("i am the currentphotos", photos);
  console.log("what am i ?????", stateee);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOneAlbumThunk(id)).then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneAlbumThunk(id))
  }, [dispatch])

  if (!loaded) return null;
  if (!photos || photos.length < 1) return null;


  return (
    <div className="album-pg-whole">
      <img
        className="album-banner"
        src={photos[0]?.photoImg}
        alt="album-banner"
      ></img>
      <div className="album-pg-background-top">
        <div>
          <div className="album-banner-info">{currentAlbum.title}</div>
          <div className="album-banner-info">{currentAlbum.description}</div>
        </div>
        <div className="album-banner-info">By: {owner}</div>
      </div>

      <div className="album-photos-btm-ctn">
        {photos && photos.map((photo) => (
          <div key={photo.id}>
            <img className="album-pg-photo-img" src={photo.photoImg} alt="photoimg"></img>
          </div>
        ))}
        </div>

    </div>
  );
}

export default AlbumPage;
