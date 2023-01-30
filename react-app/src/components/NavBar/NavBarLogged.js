import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/clickr-logo.jpg";
import profilePic from "../../assets/profile-img.jpg";
import "./NavBar.css";

const LoggedInNav = () => {
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
        <NavLink to="/you" exact={true} activeClassName="active" className="nav-link profile-link">
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
        <img src={profilePic} alt="pro-pic" className="profile-pic"></img>
      </div>
      </nav>
      </div>
  );
};


export default LoggedInNav;
