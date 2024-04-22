import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const RecipeNutrition = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState();
  const [nutrition, setNutrition] = useState();
  const [showResults, setShowResults] = useState(false);

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
    setShowResults(true);
  }

  const handleClose = () => {
    setShowResults(false);
  };

  return (
    <div className="container w-25 position-relative">
      <div className="justify-content-between d-flex">
        <input
          className="form-control mr-sm-2"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-success my-2 my-sm-0 ml-3"
          onClick={() => handleApiCall()}
        >
          Search
        </button>
      </div>
      {showResults === true ? (
        <div
          // className="accordion accordion-flush position-absolute top-100 start-0 translate-middle-x"
          className="accordion accordion-flush position-absolute justify-content-between"
          id="accordionFlushExample"
        >
          <div className="accordion-item">
            <h2 className="accordion-header d-flex">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                {nutrition ? nutrition.name : ""}
              </button>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
                style={{ height: "1px", marginTop: "17.5px" }}
              ></button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                {nutrition ? (
                  <div>
                    <li>Calories: {nutrition.calories}</li>
                    <li>Serving Size: {nutrition.serving_size_g}g</li>
                    <li>Fats: {nutrition.fat_total_g}g</li>
                    <li>Sugar: {nutrition.sugar_g}g</li>
                    <li>Fiber: {nutrition.fiber_g}g</li>
                    <li>Protein: {nutrition.protein_g}g</li>
                    <li>Cholesterol: {nutrition.cholesterol_mg}mg</li>
                    <li>Carbs: {nutrition.carbohydrates_total_g}g</li>
                    <li>Saturated Fats: {nutrition.fat_saturated_g}g</li>
                    <li>Potassium: {nutrition.potassium_mg}mg</li>
                    <li>Sodium: {nutrition.sodium_mg}mg</li>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
