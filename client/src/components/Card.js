import React from "react";
import "./Card.css";

export default function Card({
  name,
  temperament,
  weight,
  image,
  life_span,
  origin,
  id,
}) {
  return (
    <div key={id} className="card-container">
      <div className="img-card-container">
        <img
          className="img-card-styles"
          src={image}
          height="200px"
          width="270px"
          alt=""
        />
      </div>

      <div className="data-breed">
        <h2>{name}</h2>
        <h5>{temperament}</h5>
        <h5>Peso: {weight} kg</h5>
      </div>
    </div>
  );
}
