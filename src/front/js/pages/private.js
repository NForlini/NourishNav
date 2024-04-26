import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/private.css";
import "../../styles/index.css";

const Account = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [password, setPassword] = useState("");
  const [activity_level, setActivity_level] = useState("");

  useEffect(() => {
    if (store.user === null) {
      navigate("/login");
    }
  }, [store.user, navigate]);

  useEffect(() => {
    if (store.user) {
      actions.getUser();
    }
  }, [actions]);

  const handleUpdate = () => {
    actions.updateUser(email, weight, activity_level, password);
  };

  return (
    <div className="whole-wheat container text-center">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
      </style>
      <h1>Hello!</h1>
      {store.user ? (
        <div>
          <h2>{store.user.email}</h2>
          <div id="updates">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Update Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <label htmlFor="inputPassword5" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
            <select
              id="activity"
              className="form-select form-select-sm"
              onChange={(e) => setActivity_level(e.target.value)}
              value={activity_level}
            >
              <option value="">Activity Level</option>
              <option value="1">Active</option>
              <option value="2">Less Active</option>
              <option value="3">I am a potato but I'm a cute potato</option>
            </select>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Weight"
                aria-label="Weight"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
              <span className="input-group-text">Lbs</span>
            </div>
            <p>
              Please make sure email and password are present before submitting
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user details or redirecting...</p>
      )}
    </div>
  );
};

export default Account;
