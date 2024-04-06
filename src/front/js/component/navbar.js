import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import { RecipeNutrition } from "./recipes/recipeNutrition";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleLogout = async () => {
    await actions.logout();
    navigate("/login");
    console.log();
  };

  return (
    <div id="whole-wheat" className="px-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
        <div className="d-flex justify-content-between w-100">
          <div>
            <a className="navbar-brand" href="/home">
              <img
                src="https://i.imgur.com/nubofpV.png"
                alt="Logo"
                width="32px"
                height="32px"
                className="d-inline-block align-text-top"
              />
            </a>
            <Link className="navbar-brand" to={store.user ? "/profile" : "/"}>
              NourishNav
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="justify-content-between d-flex">
            <form
              className="form-inline d-flex align-items-center my-2 my-lg-0"
              onSubmit={handleSearch}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/favorites">
                  Favorites
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/metrics">
                  Metrics
                </Link>
              </li>
              {!store.user ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Log-in
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="dropdown-item" to="/signup">
                    Sign-up
                  </Link>
                </li>
              )}
            </ul>
          </div>
          ;
        </div>
      </nav>
    </div>
  );
};
