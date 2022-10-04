import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const breedDetails = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className="main-container">
      <div className="main-container-detail">
        {breedDetails.length ? (
          <div className="card-container-detail">
            <div className="img-detail-container">
              <img
                className="img-styles"
                height="200px"
                width="270px"
                src={breedDetails[0].image.url}
                alt=""
              />
            </div>
            <div className="data-breed-detail">
              <h2>{breedDetails[0].name}</h2>
              <h3>Altura: {breedDetails[0].height.metric} cm</h3>
              <h3>Peso: {breedDetails[0].weight.metric} kg</h3>
              <h3>Espectativa de vida: {breedDetails[0].life_span}</h3>
              <h4>Grupo de raza: {breedDetails[0].breed_group}</h4>
              <h4>Origen: {breedDetails[0].origin} </h4>
              <h4>Temperamento: {breedDetails[0].temperament}</h4>
            </div>
          </div>
        ) : (
          <div className="card-container-detail">
            <div className="img-detail-container">
              <img
                className="img-styles"
                height="200px"
                width="270px"
                src={breedDetails.image}
                alt=""
              />
            </div>
            <div className="data-breed-detail">
              <h2>{breedDetails.name}</h2>
              <h3>Altura: {breedDetails.height} cm</h3>
              <h3>Peso: {breedDetails.weight} kg</h3>
              <h3>Espectativa de vida: {breedDetails.life_span} años</h3>
              <h4>
                Temperamento:
                {breedDetails.temperaments}
              </h4>
            </div>
          </div>
        )}
        <br />
        <Link to="/home">
          <button className="btn">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
