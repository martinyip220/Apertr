import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/clickr-logo.jpg";
import profilePic from "../../assets/profile-img.jpg";
import "./NavBar.css";

const LoggedInNav = () => {
  return (
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
      </div>
      <div className="logged-nav-right">
        <NavLink to="/photos/new">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </NavLink>
        <img src={profilePic} alt="pro-pic" className="profile-pic"></img>
      </div>
    </nav>
  );
};


export default LoggedInNav;
