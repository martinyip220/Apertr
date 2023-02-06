import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../../store/session";
import { userAlbumsThunk } from "../../store/album";
import AlbumCard from "../AlbumCard";
import Footer from "../Footer";
import profilePic from "../../assets/profile-img.jpg";
import "./index.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.album?.userAlbums);
  let albumsArr;

  if (loaded) {
    albumsArr = Object.values(albumsObj);
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userAlbumsThunk(user?.id));
      await dispatch(getAllUsers()).then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, [dispatch, user?.id]);

  if (!loaded) return null;

  return (
    <div className="profile-pg-whole">
      <div className="profile-pg-background-top">
        <div className="profile-info-container">
          <img src={profilePic} alt="pro-img" className="prof-img"></img>
          <div className="profile-name-info-container">
            <div className="prof-full-name-btn-container">
              <div className="prof-fullname">{user?.full_name}</div>

              {/* below is a button next to full name, to change background url, for later */}
              {/* <button className="pro-btn">
                <i className="fa-solid fa-ellipsis"></i>
              </button> */}
            </div>
            <div className="prof-username-followers-container">
              <div className="prof-info-text">{user?.username}</div>
              <div className="prof-info-text">0 Followers</div>
              <i className="fa-solid fa-circle"></i>
              <div className="prof-info-text">0 Following</div>
            </div>
          </div>
        </div>
      </div>

      <div className="album-nav-container">
        <div className="albun-nav-label">Albums</div>
      </div>

      <div className="albums-container-bg">
        <div className="add-album-container">
          <NavLink
            to="/albums/new"
            exact={true}
            activeClassName="active"
            className="add-album-link"
          >
            <i className="fa-solid fa-folder-plus"></i>
            <div className="add-album-text">New Album</div>
          </NavLink>
        </div>

        {albumsArr.length > 0 && (
          <div className="albums-ctn-page">
            {loaded &&
              albumsArr.map((album) => (
                <div className="albums-container" key={album.id}>
                  <AlbumCard albumId={album.id} />
                </div>
              ))}
          </div>
        )}
        {albumsArr.length === 0 && (
          <div className="no-albums-ctn">
            <div className="no-albums-msg">
              You have no albums. Create one today!
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
