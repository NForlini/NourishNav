import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/recipeDetail.css";
import "../../../styles/index.css";

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsWithImg, setIngredientsWithImg] = useState([]);
  const { id } = useParams();

  async function getRecipe() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + id
    );
    let data = await response.json();
    setRecipe(data.meals[0]);
  }

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    const newIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        newIngredients.push({ ingredient, measure });
      }
    }
    setIngredients(newIngredients);
  }, [recipe]);

  return (
    <div
      id="whole-wheat whole-wheat-RD"
      className="whole-wheat whole-wheat-RD mx-auto w-100"
    >
      <div className="recipeName">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
        </style>
        {recipe.strMeal}
      </div>
      <div className="tags d-flex justify-content-center">
        <div>{recipe.strCategory},</div>
        <div>{recipe.strArea}</div>
      </div>
      <div className="d-flex">
        <img
          className="recipeImg"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div className="ingredients">
          <h5 className="ingName">Ingredients</h5>
          <ul style={{ height: "275px", display: "flex", flexWrap: "wrap" }}>
            {ingredients.map((ingredient, index) => (
              <li className="d-flex flex-column mx-4" key={index}>
                <img
                  height="75px"
                  width="75px"
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}.png`}
                />
                {ingredient.ingredient}-{ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="method">
        <div>{recipe.strInstructions}</div>
      </div>
    </div>
  );
}
