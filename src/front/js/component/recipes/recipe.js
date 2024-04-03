import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import RecipeCard from "./recipeCard";

export default function Recipes() {
  const { category } = useParams();

  return (
    <div>
      <RecipeCard category={category} />
    </div>
  );
}
