import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Highlights() {
  const [recipe, setRecipe] = useState([]);

  async function getRecipe() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/latest.php"
    );
    let data = await response.json();
    console.log(data);
    setRecipe(data.meals);
  }
  useEffect(() => {
    getRecipe();
  }, []);
  console.log(recipe);

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
            <button onClick={() => handleFavorites(recipeItem.strMeal)}>
              💖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
