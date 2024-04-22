import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./recipeDetail.css";

// WHY ARE YOU LIKE THIS AGAIN?!?!?!

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
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
      className="whole-wheat-RD mx-auto w-100"
    >
      <img
        className="recipeImg"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <div>{recipe.strMeal}</div>
      <div>
        <h5>Ingredients</h5>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredient} - {ingredient.measure}
            </li>
          ))}
        </ul>
      </div>
      <div>{recipe.strCategory}</div>
      <div>{recipe.strArea}</div>
      <div>{recipe.strInstructions}</div>
      <div>{recipe.strTags}</div>
      <div>{recipe.strYoutube}</div>
    </div>
  );
}
