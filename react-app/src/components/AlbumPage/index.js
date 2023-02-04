import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllAlbumsThunk, getOneAlbumThunk } from "../../store/album";
import { getAllPhotosThunk } from "../../store/photo";

import "./index.css";

function AlbumPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const id = parseInt(albumId);
  const currentAlbum = useSelector((state) => state.album.singleAlbum);
  const photos = useSelector((state) => state.album.singleAlbum.photos);
  const owner = useSelector((state) => state.session.user?.full_name);

  function addDefaultSrc(e) {
    e.target.src =
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOneAlbumThunk(id)).then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneAlbumThunk(id));
  }, [dispatch]);

  const handleRedirect = async (id) => {
    await dispatch(getOneAlbumThunk(id));

    return history.push(`/albums/${id}/edit`);
  };

  if (!loaded) return null;
  if (!photos) return null;

  return (
    <div className="album-pg-whole">
      <div style={{ position: "relative" }}>
        <img
          className="album-banner"
          src={
            photos.length
              ? photos[0]?.photoImg
              : "https://previews.123rf.com/images/imagecatalogue/imagecatalogue1611/imagecatalogue161115996/66632914-no-se-encuentra-el-texto-sello-de-goma-sello-de-marca-de-agua-t%C3%ADtulo-dentro-de-banner-rectangular-re.jpg"
          }
          onError={addDefaultSrc}
          alt="album-banner"
        ></img>
        <div className="album-pg-background-top">
          <div className="album-banner-title-descr">
            <div className="album-banner-info-title">{currentAlbum.title}</div>
            <div className="album-banner-info-description">
              {currentAlbum.description}
            </div>
          </div>

          <div className="album-banner-info-credits">By: {owner}</div>
        </div>
      </div>

      {photos.length >= 1 && (
        <div className="album-photos-btm-ctn">
        {photos &&
          photos.map((photo) => (
            <div key={photo.id}>
              <img
                onError={addDefaultSrc}
                className="album-pg-photo-img"
                src={photo.photoImg}
                alt="photoimg"
              ></img>
            </div>
          ))}
      </div>
      )}
      {!photos.length && (
        <div className="empty-album-ctn">
          <div className="empty-album-msg">This album is empty. Please add some photos here!</div>
          <i
            className="fa-solid fa-pen-to-square add-to-empty-alb-btn"
            onClick={() => handleRedirect(currentAlbum.id)}
          ></i>
        </div>
      )}
    </div>
  );
}

export default AlbumPage;
