import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import "../../styles/highlights.css";

export default function Highlights() {
  const [recipe, setRecipe] = useState([]);
  const { store, actions } = useContext(Context);

  async function getRecipe() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/latest.php"
    );
    let data = await response.json();
    setRecipe(data.meals);
  }
  useEffect(() => {
    getRecipe();
  }, []);

  const handleFavorites = (item) => {
    if (store.favorites.includes(item)) {
      actions.removeFavorites(item);
    } else {
      actions.addFavorites(item);
    }
  };

  return (
    <div className="d-flex col-10 mx-auto overflow-auto">
      {recipe?.map((recipeItem, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img
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
