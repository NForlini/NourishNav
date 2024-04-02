import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export default function Highlights() {
  const [recipe, setRecipe] = useState({});

  async function getRecipe() {
    let response = await fetch(
      "www.themealdb.com/api/json/v1/9973533/latest.php"
    );
    setRecipe(data.meals);
  }
  useEffect(() => {
    getRecipe();
  }, []);
  console.log(recipe);

  return <div></div>;
}
