import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecipeCategories() {
  const [categories, setCategoties] = useState([]);
  async function getCategories() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/categories.php"
    );
    let data = await response.json();
    setCategoties(data.categories);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="d-flex col-10 mx-auto overflow-auto">
      {categories?.map((category, index) => (
        <div key={index} className="card" style={{ minWidth: "18rem" }}>
          <img
            src={category.strCategoryThumb}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{category.strCategory}</h5>
            <h5 className="card-title">{category.strCategoryDescription}</h5>
            <Link
              to={"/recipes/" + category.strCategory}
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
