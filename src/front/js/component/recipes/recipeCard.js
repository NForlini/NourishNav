import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export default function RecipeCard(props) {
  const [recipe, setRecipe] = useState([]);
  const { store, actions } = useContext(Context);

  // useEffect(() => {
  //   // Does this search work?
  //   document
  //     .getElementById("searchForm")
  //     .addEventListener("submit", function (event) {
  //       event.preventDefault();

  //       var query = document.getElementById("searchInput").value;

  //       fetch(
  //         "https://api.calorieninjas.com/v1/nutrition?query=" +
  //           encodeURIComponent(query),
  //         {
  //           method: "GET",
  //           headers: {
  //             "X-Api-Key": "a6SJ0mhQQeAcTQWuf6iKvQ==eL9qCOhw9zSvjNxM",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }
  //           return response.json();
  //         })
  //         .then((result) => {
  //           console.log(result);
  //         })
  //         .catch((error) => {
  //           console.error("Error: ", error);
  //         });
  //     });
  // }, []);
  // dont think you need this, too scared to delete it
  //me too T-T
  //
  // but use this one with the recipe api
  async function getRecieps() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=" +
        props.category
    );
    let data = await response.json();
    setRecipe(data.meals);
  }
  useEffect(() => {
    getRecieps();
  }, []);

  const handleFavorites = (item) => {
    if (store.favorites.includes(item)) {
      actions.removeFavorites(item);
    } else {
      actions.addFavorites(item);
    }
  };
  return (
    <div className="whole-wheat whole-wheat-RC d-flex col-10 mx-auto overflow-auto">
      {recipe?.map((recipeItem, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img
            src={recipeItem.strMealThumb}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{recipeItem.strMeal}</h5>
            <Link
              to={"/recipeDescription/" + recipeItem.idMeal}
              className="btn btn-primary"
            >
              Learn More
            </Link>
            <button onClick={() => handleFavorites(recipeItem.strMeal)}>
              💖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
