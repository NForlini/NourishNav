import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

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
    <div className="whole-wheat whole-wheat-home">
      <div className="main-recipe">
        <div>
          <h3 id="RecipeOTD">Recipe of The Day</h3>
          <h5 id="RecipeOTDName">
            {randomRecipe ? randomRecipe.strMeal : "Loading..."}
          </h5>
          {randomRecipe && (
            <div>
              <p className={`recipe-details ${isReadMore ? "" : "expanded"}`}>
                {randomRecipe.strInstructions}
              </p>
              {randomRecipe.strInstructions.length > 750 && (
                <button className="read-more" onClick={toggleReadMore}>
                  {isReadMore ? "Read More" : "Show Less"}
                </button>
              )}
            </div>
          )}
        </div>
        <div className="image">
          {randomRecipe && (
            <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
          )}
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
