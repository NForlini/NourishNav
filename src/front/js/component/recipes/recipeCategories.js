import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecipeCategories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      let response = await fetch(
        "https://www.themealdb.com/api/json/v2/9973533/categories.php"
      );
      let data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="whole-wheat whole-wheat-RCat d-flex flex-wrap justify-content-center col-10 mx-auto overflow-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="card m-2"
          style={{ minWidth: "18rem", maxWidth: "20rem" }}
        >
          <img
            src={category.strCategoryThumb}
            className="card-img-top"
            alt={category.strCategory}
          />
          <div className="card-body">
            <h5 className="card-title">{category.strCategory}</h5>
            <p
              className="card-text"
              style={{ height: "300px", overflow: "scroll" }}
            >
              {category.strCategoryDescription}
            </p>
            <Link
              to={`/recipes/${category.strCategory}`}
              className="btn btn-primary"
            >
              Go to category
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
