import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import RecipeCard from "../component/recipes/recipeCard";
import { RecipeNutrition } from "../component/recipes/recipeNutrition";
// import { Modal } from "../component/modal";
// import Metrics from "../pages/metrics";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <RecipeCard />
      <RecipeNutrition />
    </div>
  );
};
