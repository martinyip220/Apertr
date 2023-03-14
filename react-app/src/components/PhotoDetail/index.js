import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePhotoThunk, getAllPhotosThunk } from "../../store/photo";
import { getAllUsers } from "../../store/session";
import CommentCard from "../Comment";
import CommentForm from "../CreateComment";
import DeletePhotoModal from "../DeletePhoto";
import EditPhotoModal from "../EditPhoto";
import Footer from "../Footer";
import { getAllPhotoCommentsThunk } from "../../store/comment";
import { getAllPhotoTagsThunk } from "../../store/tag";
import OpenModalMenuItem from "../OpenModalButton";
import profilePic from "../../assets/profile-img.jpg";
import "./index.css";
import TagCard from "../Tag";
import CreateTagModal from "../Tag/createTag";

function PhotoDetail() {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const id = Number(photoId);
  const [loaded, setLoaded] = useState(false);
  const singlePhoto = useSelector((state) => state.photo?.singlePhoto);
  const user = useSelector((state) => state.session?.user);
  const allPhotoComments = useSelector((state) => state.comment.photoComments);
  const allPhotoTags = useSelector((state) => state.tag.photoTags);
  const commentsArr = Object.values(allPhotoComments);
  const tagsArr = Object.values(allPhotoTags);
  const ownerId = singlePhoto.userId;

  function addDefaultSrc(e) {
    e.target.src =
      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllPhotosThunk());
      await dispatch(getOnePhotoThunk(id));
      await dispatch(getAllPhotoCommentsThunk(id));
      await dispatch(getAllPhotoTagsThunk(id));
      await dispatch(getAllUsers()).then(setLoaded(true));
    })();
  }, [dispatch, id]);

  if (!loaded) return null;

  return (
    <div className="photo-detail-page">
      <div className="photo-detail-img-background">
        <div className="photo-detail-img-container">
          <img
            onError={addDefaultSrc}
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
        <div className="profile-pic-photo-info-ctn">
          <img
            className="default-photopic"
            src={profilePic}
            alt="default"
          ></img>
          <div className="owner-photo-info">
            <div className="owner-name">{singlePhoto.username}</div>
            <div className="owner-description">{singlePhoto.description}</div>
          </div>
        </div>

        <div className="comments-tags-info-ctn">
          <div className="photo-pg-comments-wrapper">
            <div className="comments-title-ctn">
              <h2>Comments</h2>
            </div>
            <div className="comments-area">
              {loaded &&
                commentsArr.map((comment) => (
                  <div key={comment.id}>
                    <CommentCard comment={comment} photoId={photoId} />
                  </div>
                ))}
              {user && <CommentForm photoId={photoId} />}
            </div>
          </div>
          <div className="photos-pg-placeholder-ctn">
            <div className="tags-photo-title-create-ctn">
              <div className="tags-photo-title">Tags:</div>
              {user && (
                <div className="tag-create-icon-ctn">
                Add
                <button className="tag-create-icon-btn">
                  <OpenModalMenuItem
                    itemText={<i class="fa-solid fa-plus"></i>}
                    modalComponent={
                      <CreateTagModal photoId={id} />
                    }
                  />
                </button>
              </div>
              )}

            </div>
            <div className="tags-area">
              {loaded &&
                tagsArr.length > 0 &&
                tagsArr.map((tag) => (
                  <div key={tag.id}>
                    <TagCard tag={tag} photoId={photoId} />
                  </div>
                ))}
              {loaded && tagsArr.length === 0 && <div>Create a Tag!</div>}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="footer-pg-ctn">
      <Footer />
      </div> */}
    </div>
  );
}

export default PhotoDetail;
