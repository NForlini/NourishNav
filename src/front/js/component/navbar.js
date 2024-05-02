import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import { RecipeNutrition } from "./recipes/recipeNutrition";
import Logo from "../../img/ISOTIPO.png";
import NourishNav from "../../img/TEXTO2.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await actions.logout();
    navigate("/login");
  };

  useEffect(() => {
    actions.getUser();
  }, [actions]);

  return (
    <div id="whole-wheat-nav" className="px-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
        <div className="d-flex justify-content-between w-100">
          <div>
            <Link className="navbar-brand" to="/">
              <img
                src="../../ISOTIPO.png"
                alt="Logo"
                width="40px"
                height="40px"
                className="d-inline-block align-text-top"
              />
            </Link>
            <Link className="navbar-brand" to={store.user ? "/account" : "/"}>
              <img
                src="../../TEXTO2.png"
                alt="NourishNav"
                width="100px"
                height="45px"
                className="d-inline-block align-text-top"
              />
            </Link>
          </div>
          <RecipeNutrition />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/features">
                Highlights
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
            </li>
          </ul>
          <div className="dropdown">
            <button
              className="btn btn-outline-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {store.user ? (
                <>
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
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Log-in
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
