import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPhotosThunk } from "../../store/photo";
import { useDispatch } from "react-redux";
import logo from "../../assets/clickr-logo.jpg";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPhotosThunk());
  }, [dispatch]);

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <div className="nav-left">
          <li className="nav-bar-items">
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">
              <img className="nav-logo" src={logo} alt="splash-logo"></img>
            </NavLink>
          </li>
          <li className="nav-bar-items">
            <NavLink to="/explore" exact={true} activeClassName="active" className="nav-link">
              Explore
            </NavLink>
          </li>
        </div>

        <div className="nav-right">
          <li className="nav-bar-items">
            <NavLink to="/login" exact={true} activeClassName="active" className="nav-link">
              Log In
            </NavLink>
          </li>
          <button className="signup-btn">
            <NavLink to="/sign-up" exact={true} activeClassName="active" className="signup-btn">
              Sign Up
            </NavLink>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
