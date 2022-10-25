import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName } from "../actions";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getBreedsByName(name));
  }

  return (
    <div className="searchbar-main-container">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
        className="inputSearch"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
      <button
        className="search-btn"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
