import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/index.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    await actions.login(userInfo);
    navigate("/account");
  }

  return (
    <div
      id="whole-wheat-login"
      className="whole-wheat whole-wheat-login container mt-5"
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
      </style>
      <form className="row g-3 border border-lightgray">
        <div
          id="login-header"
          className="py-2 bg-light border-bottom border-lightgray mt-0 text-center"
        >
          <h2 style={{ fontFamily: "Satisfy" }}>Login</h2>
        </div>
        <div id="email-field" className="col-md-12">
          <label htmlFor="email-input" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email-input"
            className="mt-0 form-control login-input"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div id="password-field" className="col-md-12">
          <label htmlFor="password-input" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            className="mt-0 form-control login-input"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />

          <Link
            to="/forgot-password"
            className="text-right"
            style={{ display: "block", marginTop: "5px" }}
          >
            Forgot Password?
          </Link>
        </div>
        <button
          id="login-button"
          type="button"
          onClick={handleLogin}
          className="btn btn-success"
        >
          Login
        </button>
      </form>
    </div>
  );
};
