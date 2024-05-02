import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/recipeCard.css";

export default function RecipeCard(props) {
  const [recipe, setRecipe] = useState([]);
  const { store, actions } = useContext(Context);

  async function getRecieps() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=" +
        props.category
    );
    let data = await response.json();
    setRecipe(data.meals);
  }
  useEffect(() => {
    getRecieps();
  }, []);

  const handleFavorites = (item) => {
    if (store.favorites.includes(item)) {
      actions.removeFavorites(item);
    } else {
      actions.addFavorites(item);
    }
  };
  return (
    <div className="whole-wheat whole-wheat-RC d-flex col-10 mx-auto overflow-auto">
      {recipe?.map((recipeItem, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img
            src={recipeItem.strMealThumb}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{recipeItem.strMeal}</h5>
            <Link
              to={"/recipeDescription/" + recipeItem.idMeal}
              className="btn btn-outline-success"
            >
              Learn More
            </Link>
            <button
              className="btn btn-success-active"
              onClick={() => handleFavorites(recipeItem.strMeal)}
            >
              💖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
