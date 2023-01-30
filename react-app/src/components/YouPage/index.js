import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink, Link } from "react-router-dom";
import { getAllUsers } from "../../store/session";
import { getAllAlbumsThunk, userAlbumsThunk } from "../../store/album";
import profilePic from "../../assets/profile-img.jpg";
import "./index.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.album.userAlbums);
  const albumsArr = Object.values(albumsObj);

  // await console.log("what am i ???", albumsArr);
  // console.log("do i break? ", albumsArr[0].description)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userAlbumsThunk(user.id));
      await dispatch(getAllUsers())
      .then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, []);

  if (!loaded) return null;

  return (
    <div className="profile-pg-whole">
      <div className="profile-pg-background-top">
        <div className="profile-info-container">
          <img src={profilePic} alt="pro-img" className="prof-img"></img>
          <div className="profile-name-info-container">
            <div className="prof-full-name-btn-container">
              <div className="prof-fullname">{user.full_name}</div>
              <button className="pro-btn">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
            <div className="prof-username-followers-container">
              <div className="prof-info-text">{user.username}</div>
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

        <div className="albums-container">
          {loaded &&
            albumsArr.map((album) => (
              <div className="albums-card">
                <Link to={`/albums/${album.id}`} className="album-detail-link">
                  <img
                    className="album-img"
                    src={album.photos[0].photoImg}
                  ></img>
                </Link>
                <div>{album.title}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
