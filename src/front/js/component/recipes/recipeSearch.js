import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const RecipeSearch = () => {
  const { store, actions } = useContext(Context);
  const [query, setQuery] = useState();
  const [meal, setMeals] = useState();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  async function handleApiCall() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query
      // {
      //   method: "GET",
      //   headers: { "X-Api-Key": "9973533" },
      //   contentType: "application/json",
      // }
    );
    let data = await response.json();
    // setSearch(data.meals[0].idMeal);
    navigate(`/recipeDescription/${data.meals[0].idMeal}`);
    // setShowResults(true);
  }

  // const handleClose = () => {
  //   setShowResults(false);
  // };

  return (
    <div className="container w-25 position-relative">
      <div className="justify-content-between d-flex">
        <input
          className="form-control mr-sm-2 p-1 mt-2"
          type="text"
          placeholder="Search Recipes"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-success my-2 mb-sm-0 ml-3"
          onClick={() => handleApiCall()}
        >
          Search
        </button>
      </div>
      {showResults === true ? <div></div> : null}
    </div>
  );
};
