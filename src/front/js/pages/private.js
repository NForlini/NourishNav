import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import "../../styles/private.css";

const Account = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [password, setPassword] = useState("");
  const [activity_level, setActivity_level] = useState("");

  useEffect(() => {
    actions.getUser();
  }, []);

  return (
    <div className="container text-center">
      <h1>Hello!</h1>
      {store.user != null ? (
        <div>
          <h2>Email: {store.user.email}</h2>
        </div>
      ) : (
        navigate("/login")
      )}
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          id="email"
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
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>
      <select
        id="activity"
        className="form-select form-select-sm"
        aria-label="Small select example"
        onChange={(e) => setActivity_level(e.target.value)}
        value={activity_level}
      >
        <option value="">Activity Level</option>
        <option value="1">Active</option>
        <option value="2">Less Active</option>
        <option value="3">I am a potato but I'm a cute potato</option>
      </select>
      <div className="input-group">
        <input type="text" className="form-control" aria-label="weight" />
        <span className="input-group-text">Lbs</span>
      </div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-dismiss="modal"
        onClick={() =>
          actions.updateUser(email, weight, activity_level, password)
        }
      >
        Update
      </button>
    </div>
  );
};
export default Account;
