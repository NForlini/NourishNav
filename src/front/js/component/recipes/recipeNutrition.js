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
    setNutrition(data.items[0]);
  }

  return (
    <div className="container">
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleApiCall()}
      >
        Seach
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {nutrition.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {nutrition ? (
                <div>
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//make modal instead of input in navbar, then pass in recipeNutrition
