import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const recipeNutrition = () => {
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
          <li>{nutrition.name}</li>
          <li>{nutrition.calories}</li>
          <li>{nutrition.serving_size_g}</li>
          <li>{nutrition.fat_total_g}</li>
          <li>{nutrition.sugar_g}</li>
          <li>{nutrition.fiber_g}</li>
          <li>{nutrition.protein_g}</li>
          <li>{nutrition.cholesterol_mg}</li>
          <li>{nutrition.calories}</li>
          <li>{nutrition.carbohydrates_total_g}</li>
          <li>{nutrition.fat_saturated_g}</li>
          <li>{nutrition.potassium_mg}</li>
          <li>{nutrition.sodium_mg}</li>
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
