import React from "react";
import "./Paginado.css";

export default function Paginado({ breedsPerPage, allBreeds, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginado">
      <ul>
        {pageNumbers?.map((number) => {
          return (
            <button
              onClick={() => paginado(number)}
              key={number}
              className="small-btn"
            >
              {number}
            </button>
          );
        })}
      </ul>
    </nav>
  );
}
