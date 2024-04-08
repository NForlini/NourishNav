import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Demo = () => {
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

  async function login(e) {
    e.preventDefault();
    await actions.login(userInfo);
    navigate("/account");
  }

  return (
    <div className="whole-wheat text-center">
      <h1>Login</h1>
      <div className="signupContainer">
        <form>
          <div className="row g-3 align-items-center">
            <label htmlFor="email" className="col-form-label">
              Email
            </label>
            <input
              type="text"
              id="inputPassword6"
              className="mt-0"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="row g-3 align-items-center">
            <label htmlFor="inputPassword6" className="col-form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword6"
              className="mt-0"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <div className="row g-3 align-items-center">
            <button className="btn btn-info" onClick={(e) => login(e)}>
              Submit
            </button>
          </div>
          <div className="row g-3 align-items-center">
            <Link
              to={"/signup"}
              className="btn btn-info"
              onClick={(e) => login(e)}
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
