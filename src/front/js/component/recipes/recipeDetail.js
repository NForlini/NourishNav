import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
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
  console.log(recipe);
  return (
    <div>
      <img src={recipe.strMealThumb} />
      <div>{recipe.strMeal}</div>
      <div>{recipe.strCategory}</div>
      <div>{recipe.strArea}</div>
      <div>{recipe.strInstructions}</div>
      <div>{recipe.strTags}</div>
      <div>{recipe.strYoutube}</div>
    </div>
  );
}
