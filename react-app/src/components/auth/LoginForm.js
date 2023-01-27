import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

    history.push("/explore")
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/explore" />;
  }

  return (
    <div className="auth-forms-bg">
      <div className="form-container">
        <div className="form-top-container">
          <img
            className="logo-auth"
            src="https://i.imgur.com/aRZYLNj.jpg"
            alt="logo"
            onClick={() => history.push("/")}
          ></img>
          <div className="form-title">Log in to Clickr</div>
        </div>

        <form className="auth-form" onSubmit={onLogin}>
          <div className="auth-error-container">
            {errors.map((error, ind) => (
              <div className="auth-error-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>

          <div className="auth-input-container">
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="auth-input-fields"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="auth-input-container">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="auth-input-fields"
              value={password}
              onChange={updatePassword}
            />
          </div>

          <div className="auth-btn-container">
            <button type="submit" className="auth-btn">
              Login
            </button>
            <button
              className="auth-btn"
              type="submit"
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              Demo Login
            </button>
          </div>
          <div className="login-form-register">
            <div className="login-form-text">Not a Clickr member?</div>
            <NavLink to="/sign-up" className="register">
              Sign up here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
