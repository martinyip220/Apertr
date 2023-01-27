import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFull_Name] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, full_name, email, password));
      if (data) {
        setErrors(data);
      }
      history.push("/explore")
    } else if (password !== repeatPassword) {
      let errors = [];
      errors.push("Passwords do not match. Please try again.");
      return setErrors(errors);
    }
  };



  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullName = (e) => {
    setFull_Name(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/explore" />;
  }

  return (
    <div className="auth-forms-bg">
      <div className="signup-form-container">
        <div className="form-top-container">
          <img
            className="logo-auth"
            src="https://i.imgur.com/aRZYLNj.jpg"
            alt="logo"
            onClick={() => history.push("/")}
          ></img>
          <div className="form-title">Sign up for Clickr</div>
        </div>

        <form className="auth-form" onSubmit={onSignUp}>
          <div className="auth-error-container">
            {errors.map((error, ind) => (
              <div className="auth-error-msg" key={ind}>
                {error}
              </div>
            ))}
          </div>

          <div className="auth-input-container">
            <input
              type="text"
              name="username"
              className="auth-input-fields"
              placeholder="Username"
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className="auth-input-container">
            <input
              type="text"
              name="fullName"
              className="auth-input-fields"
              placeholder="Full Name"
              onChange={updateFullName}
              value={full_name}
              required
            ></input>
          </div>
          <div className="auth-input-container">
            <input
              type="text"
              name="email"
              className="auth-input-fields"
              placeholder="Email"
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className="auth-input-container">
            <input
              type="password"
              name="password"
              className="auth-input-fields"
              placeholder="Password"
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className="auth-input-container">
            <input
              type="password"
              name="repeat_password"
              className="auth-input-fields"
              onChange={updateRepeatPassword}
              placeholder="Repeat Password"
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="auth-btn-container">
            <button type="submit" className="auth-btn">
              Sign Up
            </button>
          </div>

          <div className="login-form-register">
            <div className="login-form-text">Already a Clickr member?</div>
            <NavLink to="/login" className="register">
              Log in here
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
