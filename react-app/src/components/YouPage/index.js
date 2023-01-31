import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink, Link } from "react-router-dom";
import { getAllUsers } from "../../store/session";
import { getAllAlbumsThunk, userAlbumsThunk } from "../../store/album";
import { deleteAlbumThunk } from "../../store/album";
import AlbumCard from "../AlbumCard";
import profilePic from "../../assets/profile-img.jpg";
import "./index.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.album?.userAlbums);
  let albumsArr;

  if (loaded) {
    albumsArr = Object.values(albumsObj);
  }
  // const albumsArr = Object.values(albumsObj);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userAlbumsThunk(user.id));
      await dispatch(getAllUsers()).then(setLoaded(true));
    };

    fetchData().catch(console.error);
  }, [dispatch]);


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

        {albumsArr.length > 0 &&
          <div className="album-card-margins">
            {loaded && albumsArr.map((album) => (
              <div key={album.id}>
                <AlbumCard albumId={album.id} />
              </div>
            ))}
          </div>

        }






        {/* {albumsArr.length > 0 &&
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

                  <div className="album-actions">
                    <div className="album-title">{album.title}</div>
                    <div className="album-edit-delete-btn-ctn">
                      <i className="fa-solid fa-pen-to-square edit-album-btn"></i>

                      <i
                        className="fa-regular fa-trash-can delete-album-btn"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Deletion of album can not be undone. The photos inside will not be deleted. Do you wish to continue?"
                            )
                          ) {
                            handleDelete(album.id);
                          } else {
                            console.log("you clicked cancel");
                          }
                        }}
                        ></i>

                    </div>
                  </div>
                </div>
              ))}
          </div>
        } */}
        {albumsArr.length === 0 && (
          <div className="no-albums-ctn">
            <div className="no-albums-msg">You have no albums. Create one today!</div>
            </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
