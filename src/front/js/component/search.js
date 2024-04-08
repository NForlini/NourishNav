import React, { useState } from "react";

export default function Search() {
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="justify-content-between d-flex">
      <form
        className="form-inline d-flex align-items-center my-2 my-lg-0"
        onSubmit={handleSearch}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
