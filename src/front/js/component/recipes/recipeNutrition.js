import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

export const RecipeNutrition = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState();
  const [nutrition, setNutrition] = useState();

  async function handleApiCall() {
    let response = await fetch(
      "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      {
        method: "GET",
        headers: { "X-Api-Key": "a6SJ0mhQQeAcTQWuf6iKvQ==eL9qCOhw9zSvjNxM" },
        contentType: "application/json",
      }
    );
    let data = await response.json();
    console.log(data.items[0]);
    setNutrition(data.items[0]);
  }

  return (
    <div style={{ minHeight: "100dvh", position: "absolute", top: "200px" }}>
      <div>Hello</div>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button className="btn btn-primary" onClick={() => handleApiCall()}>
        Search
      </button>
      {nutrition ? (
        <div>
          <li>Name: {nutrition.name} </li>
          <li>Calories: {nutrition.calories}</li>
          <li>Serving Size: {nutrition.serving_size_g}g</li>
          <li>Fats: {nutrition.fat_total_g}g</li>
          <li>Sugar: {nutrition.sugar_g}g</li>
          <li>Fiber: {nutrition.fiber_g}g</li>
          <li>Protein: {nutrition.protein_g}g</li>
          <li>Cholestrol: {nutrition.cholesterol_mg}mg</li>
          <li>Carbs: {nutrition.carbohydrates_total_g}g</li>
          <li>Saturated Fats: {nutrition.fat_saturated_g}g</li>
          <li>Potassium: {nutrition.potassium_mg}mg</li>
          <li>Sodium: {nutrition.sodium_mg}mg</li>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

//  ??? this here?
// var query = "3lb carrots and a chicken sandwich";

// fetch("https://api.calorieninjas.com/v1/nutrition?query=" + query, {
//   method: "GET",
//   headers: {
//     "X-Api-Key": "a6SJ0mhQQeAcTQWuf6iKvQ==eL9qCOhw9zSvjNxM",
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error: ", error);
//   });
