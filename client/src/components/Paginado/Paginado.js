import React from "react";
import "./Paginado.css";

export default function Paginado({
  breedsPerPage,
  allBreeds,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  let style = "small-btn";

  for (let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="paginado">
      <ul className="btn-container">
        {pageNumbers?.map((number) => {
          return (
            <button
              onClick={() => paginado(number)}
              key={number}
              className={style}
            >
              {number}
            </button>
          );
        })}
      </ul>
    </nav>
  );
}
