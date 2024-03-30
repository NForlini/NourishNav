import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export default function recipeCard() {
  const [recipe, setRecipe] = useState([]);
  const { store, actions } = useContext(Context);
  useEffect(() => {
    //how to get to do a blank query instead of mushroom risotto?   ${query}
    var query = "mushroom risotto";

    fetch("https://api.calorieninjas.com/v1/recipe?query=" + query, {
      method: "GET",
      headers: {
        "X-Api-Key": "a6SJ0mhQQeAcTQWuf6iKvQ==eL9qCOhw9zSvjNxM",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
