import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories);
    };

    const fetchRandomRecipe = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setRandomRecipe(data.meals[0]);
    };

    fetchCategories();
    fetchRandomRecipe();
  }, []);

  const featuredCategories = ["Vegetarian", "Vegan", "Seafood"];

  return (
    <div className="whole-wheat">
      <div className="main-recipe">
        <h3 id="RecipeOTD">Recipe of The Day</h3>
        <p id="RecipeOTDName">
          {randomRecipe ? randomRecipe.strMeal : "Loading..."}
        </p>
        {randomRecipe && (
          <div className="image">
            <img
              src={randomRecipe.strMealThumb}
              alt={randomRecipe.strMeal}
              style={{ maxWidth: "50%", marginBottom: "10px" }}
            />
          </div>
        )}
        <div className="home-recipes">
          <div className="buttons">
            <button
              onClick={() =>
                navigate(`/recipeDescription/${randomRecipe.idMeal}`)
              }
            >
              Recipe
            </button>
            <button onClick={() => navigate("/favorites")}>Favorites</button>
          </div>
        </div>
      </div>
      <div className="diets">
        {categories
          .filter((category) =>
            featuredCategories.includes(category.strCategory)
          )
          .map((category, index) => (
            <div className="option" key={index}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <h6>{category.strCategory}</h6>
              <button
                onClick={() => navigate(`/recipes/${category.strCategory}`)}
              >
                Show More
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
