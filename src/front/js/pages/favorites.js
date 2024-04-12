import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import "../../styles/favorites.css";

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
    <div className="d-flex col-10 mx-auto overflow-auto">
      {store.favorites?.map((recipeItem, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img
            width="45px"
            src={recipeItem.strMealThumb}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{recipeItem.strMeal}</h5>
            {/* I don't think this link is correct because I don't have a recipeDescription.js */}
            <Link
              to={"/recipeDescription/" + recipeItem.idMeal}
              className="btn btn-primary"
            >
              Learn More
            </Link>
            <button onClick={() => handleFavorites(recipeItem)}>💖</button>
          </div>
        </div>
      ))}
    </div>
  );
}
