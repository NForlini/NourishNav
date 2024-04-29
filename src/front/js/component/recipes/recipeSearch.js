import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const RecipeSearch = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState();
  const [meal, setMeals] = useState();
  const [showResults, setShowResults] = useState(false);

  async function handleApiCall() {
    let response = await fetch(
      "www.themealdb.com/api/json/v1/9973533/search.php?s=" + query,
      {
        method: "GET",
        headers: { "X-Api-Key": "9973533" },
        contentType: "application/json",
      }
    );
    let data = await response.json();
    setSearch(data.meals[0].idMeal);
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
                {meal ? meal.meals : ""}
              </button>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
                style={{ height: "1px", marginTop: "17.5px" }}
              ></button>
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};
