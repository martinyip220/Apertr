import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/clickr-logo.jpg";
import profilePic from "../../assets/profile-img.jpg";
import { getAllUsers } from "../../store/session";
import { getAllAlbumsThunk, userAlbumsThunk } from "../../store/album";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const LoggedInNav = () => {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false)
  const user = useSelector((state) => state.session.user)
  const userId = useSelector((state) => state.session.user.id);

  const handleClick = async (e) => {
    await dispatch(getAllAlbumsThunk())
    await dispatch(userAlbumsThunk(userId))

    console.log("omg u clicked me.")
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }


  return (
    <div className="logged-nav-background">
    <nav className="logged-nav">
      <div className="logged-nav-left">
        <NavLink
          to="/explore"
          exact={true}
          activeClassName="active"
          className="nav-link"
        >
          <img className="login-signup-logo" src={logo} alt="splash-logo"></img>
        </NavLink>
        <NavLink to="/you" onClick={handleClick} exact={true} activeClassName="active" className="nav-link profile-link">
          You
        </NavLink>
        <NavLink to="/explore" exact={true} activeClassName="active" className="nav-link">
          Explore
        </NavLink>
      </div>
      <div className="logged-nav-right">
        <NavLink to="/photos/new">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </NavLink>
          <img src={profilePic} alt="pro-pic" className="profile-pic" onClick={toggleProfile}></img>
          {showProfile ? <ul className="profile-dropdown">
            <li className="user-name-dropdown">{user.full_name}</li>
          <li>
            <LogoutButton />
          </li>
        </ul> : <></>}
      </div>
      </nav>
      </div>
  );
};


export default LoggedInNav;
