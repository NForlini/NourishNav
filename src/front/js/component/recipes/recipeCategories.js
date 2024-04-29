import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecipeSearch } from "./recipeSearch";

export default function RecipeCategories() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

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
    // <div className="d-flex justify-content-center align-items-center">
    //   <form
    //     className="form-inline d-flex my-lg-0"
    //     role="search"
    //     onSubmit={handleSearch}
    //   >
    //     <input
    //       class="form-control"
    //       type="search"
    //       placeholder="Search"
    //       aria-label="Search"
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //     />
    //     <button class="btn btn-outline-success" type="submit">
    //       Search
    //     </button>
    //   </form>
    <div>
      <RecipeSearch />
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
    </div>
  );
}
