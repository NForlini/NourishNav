import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Account = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [weight, setWeight] = useState();
  const [password, setPassword] = useState();
  const [activity_level, setActivity_level] = useState();

  //   useEffect(() => {
  //     const auth = async () => {
  //       await actions.authenticateUser();
  //     };
  //     auth();
  //     // setTimeout(() => {
  //     //   auth();
  //     // }, 500);
  //   }, []); // This closing brace was missing for the useEffect hook

  const getUser = async () => {
    console.log(token);
    const token = sessionStorage.getItem("token");
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(process.env.BACKEND_URL + "/api/user", opts);
    if (res.status < 200 || res.status >= 300) {
      throw new Error("There was an error signing in");
    }
    const data = await res.json();
    setEmail(data.email);
    setWeight(data.weight);
    setActivity_level(data.activity_level);
  };

  getUser();

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
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="Update Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <label for="inputPassword5" class="form-label">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        class="form-control"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
        value={setPassword}
      />
      <div id="passwordHelpBlock" class="form-text">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>
      <select
        id="activity"
        class="form-select form-select-sm"
        aria-label="Small select example"
        onChange={(e) => setActivity_level(e.target.value)}
        value={setActivity_level}
      >
        <option selected>Acitvity Level</option>
        <option value="1">Active</option>
        <option value="2">Less Active</option>
        <option value="3">I am a potato but I'm a cute potato</option>
      </select>
      <div class="input-group">
        <input type="text" class="form-control" aria-label="weight" />
        <span class="input-group-text">Lbs</span>
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
