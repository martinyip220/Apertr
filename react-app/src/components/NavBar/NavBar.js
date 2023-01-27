import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { getAllPhotosThunk } from "../../store/photo";
import { useDispatch } from "react-redux";
import "./NavBar.css"

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPhotosThunk());
  }, [dispatch]);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" exact={true} activeClassName="active">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
