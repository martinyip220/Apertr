import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosThunk } from "../../store/photo";
import { getAllAlbumsThunk } from "../../store/album";
import { Link } from "react-router-dom";
import "./index.css";

function ExplorePage() {
  const dispatch = useDispatch();
  const photosObject = useSelector((state) => state.photo.allPhotos?.photos);
  const [loaded, setLoaded] = useState(false);

  function addDefaultSrc(e) {
    e.target.src =
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
  }

  // use effect to get the state of all photos
  useEffect(() => {
    (async () => {
      await dispatch(getAllPhotosThunk());
      await dispatch(getAllAlbumsThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  const oddOrEven = (photoId) => {
    if (photoId % 2 === 0) {
      return "photo-img-even photo-img";
    } else {
      return "photo-img-odd photo-img";
    }
  };

  if (!loaded) return null;

  return (
    <div className="explore-pg-wrapper">
      <div className="explore-title-container">
        <div className="explore-title">Explore</div>
      </div>

      <div className="explore-pg-background">
        <div className="explore-cards-ctn">
          <div className="explore-pg-imgs">
            {loaded &&
              photosObject.map((photo) => (
                <div className="photo-container" key={photo.id}>
                  <Link
                    className="photo-detail-link"
                    to={`/photos/${photo.id}`}
                  >
                    <img
                      onError={addDefaultSrc}
                      className={oddOrEven(photo.id)}
                      src={photo.photoImg}
                      alt="explore"
                    ></img>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
