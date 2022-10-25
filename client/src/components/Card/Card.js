import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({
  name,
  temperament,
  height,
  weight,
  life_span,
  image,
  id,
  buttonVisibility = true,
}) {
  const [front, setFront] = useState("card-front");

  const [back, setBack] = useState("card-back");

  function handleFlip() {
    if (front === "card-front") {
      setFront("card-front flipped");
      setBack("card-back flipped");
    } else {
      setFront("card-front");
      setBack("card-back");
    }
  }

  return (
    <div className="card-container">
      <div className="card">
        <div onClick={handleFlip} className={front}>
          <p className="card-names">{name}</p>
          <img
            className="img-card-styles"
            src={image}
            height="200px"
            width="270px"
            alt=""
          />
        </div>

        <div onClick={handleFlip} className={back}>
          <p className="card-titles">Temperament: {temperament}</p>
          <p className="card-titles">Weight: {weight} kg</p>
          <p className="card-titles">Height: {height}</p>
          <p className="card-titles">Life Span: {life_span}</p>
          {buttonVisibility ? (
            <Link to={"/home/" + id}>
              <button>View More!</button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
