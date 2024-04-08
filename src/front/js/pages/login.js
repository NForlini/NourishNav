import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-5">
      <form className="row g-3 border border-lightgray">
        <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
          <h2>Login</h2>
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="inputPassword6"
            className="mt-0 form-control"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword6"
            className="mt-0 form-control"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={(e) => handleLogin(e)}
          className="btn btn-primary"
        >
          Login
        </button>
        {/* <button
          type="button"
          onClick={handleResetPassword}
          className="btn btn-alert"
        >
          {" "}
          Forgot Password
        </button> */}
      </form>
    </div>
  );
};
