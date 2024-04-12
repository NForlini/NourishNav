import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Metrics from "./metrics";
import "../../styles/profile.css";
// import { Link } from "react-router-dom";
// import "../../styles/profile.css";

const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  function openSideNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  // useEffect(() => {
  //     if (!store.user) {
  //         actions.authenticateUser()
  //             .then(() => {
  //                 // If authentication is successful and user is retrieved,
  //                 // you can optionally perform additional actions here.
  //             })
  //             .catch(() => {
  //                 // If authentication fails, redirect to home.
  //                 navigate("/");
  //             });
  //     }
  // }, [actions, navigate, store.user]);

  return (
    <div className="container text-center">
      <h1>Hello!</h1>
      <ol
        className="list-group list-group-numbered w-25 h-100"
        style={{ position: "absolute", left: 0 }}
      >
        <li className="list-group-item" style={{ height: "100px" }}>
          <a href="#">Account</a>
        </li>
        <li className="list-group-item" style={{ height: "100px" }}>
          <a href="#favorites">Favotites</a>
        </li>
        <li className="list-group-item" style={{ height: "100px" }}>
          <a href="#metrics"> Metrics</a>
        </li>
        <li className="list-group-item" style={{ height: "100px" }} s>
          <a onClick={() => actions.logout()}>Logout</a>
        </li>
      </ol>
      <div style={{ height: "400px" }}></div>
      <Metrics />
    </div>
  );
};

export default Private;
