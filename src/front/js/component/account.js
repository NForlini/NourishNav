import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export default function Account() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState();
  const [weight, setWeight] = useState();
  const [activity_level, setActivity_level] = useState();

  useEffect(() => {
    async function getUser() {
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
      const data = await res.json();
      setEmail(data.email);
      setWeight(data.weight);
      setActivity_level(data.activity_level);
    }
    getUser();
  }, []);
  return (
    <div className="whole-wheat whole-wheat-acc">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                //   value={email}
              />
              <p>Weight</p>
              <input
                type="weight"
                onChange={(e) => setWeight(e.target.value)}
                //   value={weight}
              />
              <label htmlFor="cars"> Activity Level:</label>
              <select name="Activity_level">
                <option value="active">Very Active</option>
                <option value="less">Less</option>
                <option value="none">None</option>
              </select>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() =>
                  actions.updateUser(email, weight, activity_level)
                }
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
