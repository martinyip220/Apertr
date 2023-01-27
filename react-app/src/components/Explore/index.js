import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosThunk } from "../../store/photo";
import PhotoDetail from "../PhotoDetail";
import { Link } from "react-router-dom";
import "./index.css";

function ExplorePage() {
  const dispatch = useDispatch();
  const photosObject = useSelector((state) => state.photo.allPhotos.photos);
  const [loaded, setLoaded] = useState(false);
  // const photosArr = Object.values(photosObject);
  // const allPhotos = photosArr[0]
  console.log("what am i object?", photosObject);
  // console.log("what am i arr?", photosArr[0]);

  // use effect to get the state of all photos
  useEffect(async () => {
    await dispatch(getAllPhotosThunk());
    setLoaded(true);
  }, [dispatch]);

  return (
    <div>
      <h1>Explore</h1>
      <div>
        <div>
          {loaded &&
            photosObject.map((photo) => (
              <div className="photo-container" key={photo.id}>
                <Link className="photo-detail-link" to={`/photos/${photo.id}`}>
                  <img
                    className="photo-img"
                    src={photo.photoImg}
                    alt="explore"
                    width={300}
                  >
                  </img>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
