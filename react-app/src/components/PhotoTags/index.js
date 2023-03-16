import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPhotosThunk } from "../../store/photo";
import { photosSameTagsThunk } from "../../store/tag";
import { Link } from "react-router-dom";
import "./index.css";

function PhotoTagsPage() {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.tag.allTags);
  const tagsArr = Object.values(allTags);
  const tagPhotos = useSelector((state) => state.photo.allPhotos);
  const photosArr = Object.values(tagPhotos);
  const tagId = [];
  const tag = useParams();
  tagsArr.forEach((tag) => tagId.push(tag.photoId));
  let taggedPhotos = photosArr[0]?.filter((photo) => tagId.includes(photo.id));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(photosSameTagsThunk(tag.tag));
      await dispatch(getAllPhotosThunk()).then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, [dispatch, tag.tag]);

  if (!loaded) return null;

  return (
    <div className="tagged-pg-whole">
      <div className="tagged-pg-title">Tag: {tag.tag}</div>

      {taggedPhotos?.length >= 1 && (
        <div className="tagged-photos-area-ctn">
          {taggedPhotos &&
            taggedPhotos.map((photo) => (
              <div key={photo.id}>
                <Link className="photo-detail-link" to={`/photos/${photo.id}`}>
                  <img
                    className="tagged-pg-photo-img"
                    src={photo.photoImg}
                    alt="photoImg"
                  ></img>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PhotoTagsPage;
