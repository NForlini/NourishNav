import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import { RecipeNutrition } from "./recipes/recipeNutrition";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
            <a className="navbar-brand" to={store.user ? "/profile" : "/"}>
              <img
                src="https://i.imgur.com/nubofpV.png"
                alt="Logo"
                width="40px"
                height="40px"
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
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>
            <ul className="dropdown-menu">
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
        </div>
      </nav>
    </div>
  );
};
