import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export default function recipeCard() {
  const [recipe, setRecipe] = useState([]);
  const { store, actions } = useContext(Context);
  useEffect(() => {
    async function getRecipe() {
      let response = await fetch(
        "https://api.calorieninjas.com/v1/nutrition?query="
      );
      let data = await response.json();
      setRecipe(data.results);
    }
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
      {recipe?.map((recipe, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img src="#" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link
              to={"recipe_description/" + recipe.uid}
              className="btn btn-primary"
            >
              Learn More
            </Link>
            <button onClick={() => handleFavorites(recipe.name)}>💖</button>
          </div>
        </div>
      ))}
    </div>
  );
}
