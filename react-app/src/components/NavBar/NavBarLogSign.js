import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/clickr-logo.jpg";
import "./NavBar.css";

const LoginSignupNav = () => {
  return (
    <nav className="login-signup-nav">
      <NavLink
        to="/"
        exact={true}
        activeClassName="active"
        className="nav-link"
      >
        <img className="login-signup-logo login-sign-pg-logo" src={logo} alt="splash-logo"></img>
      </NavLink>
    </nav>
  );
};


export default LoginSignupNav;
