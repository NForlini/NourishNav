import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import "../../styles/index.css";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    setFormValue({ ...formValue, [id]: value });
  }

  const handleSignUp = async () => {
    // console.log(
    //   formValue,
    //   "formValue",
    //   formValue.email,
    //   "email",
    //   formValue.password,
    //   "password"
    // );
    await actions.signUp(formValue);
    navigate("/login");
  };

  return (
    <div className="whole-wheat whole-wheat-signup container mt-5">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
      </style>
      <form className="row g-3 border border-lightgray">
        <div
          id="h2"
          className="py-2 bg-light border-bottom border-lightgray mt-0 text-center"
        >
          <h2>Signup</h2>
        </div>
        <div className="col-md-12">
          <label id="email" htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={onChange}
            value={formValue.email}
            type="email"
            className="form-control signup-input"
            id="email"
          />
        </div>
        <div className="col-md-12">
          <label id="password" htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={formValue.password}
            type="password"
            className="form-control signup-input"
            id="password"
          />
        </div>
        <button
          id="button"
          type="button"
          onClick={() => actions.signUp(formValue, navigate)}
          // onClick={handleSignUp}
          className="btn btn-success"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
