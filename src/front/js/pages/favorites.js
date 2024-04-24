import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/favorites.css";
import "../../styles/index.css";

export default function Favorites(props) {
  const { store, actions } = useContext(Context);

  const handleFavorites = () => {
    if (store.favorites.includes(props.item)) {
      actions.removeFavorites(props.item);
    } else {
      actions.addFavorites(props.item);
    }
  };
  return (
    <div
      id="whole-wheat-favorites"
      className="whole-wheat d-flex col-10 mx-auto overflow-auto"
    >
      {store.favorites?.map((recipeItem, index) => (
        <div
          id="favorites-img"
          key={index}
          className="card"
          style={{ minWidth: "18rem" }}
        >
          <img
            width="45px"
            src={recipeItem.strMealThumb}
            className="card-img-top"
            alt="..."
          />
          <div id="favorites-recipe" className="card-body">
            <h5 className="card-title">{recipeItem.strMeal}</h5>
            <Link
              to={"/recipeDescription/" + recipeItem.idMeal}
              className="btn btn-primary"
            >
              Learn More
            </Link>
            <button
              className="btn btn-success-active"
              onClick={() => handleFavorites(recipeItem)}
            >
              💖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
