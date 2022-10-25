import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const breedDetails = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
    return dispatch(clearDetail());
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
              <h3>Height: {breedDetails[0].height.metric} cm</h3>
              <h3>Weight: {breedDetails[0].weight.metric} kg</h3>
              <h3>Life Span: {breedDetails[0].life_span}</h3>
              <h4>Breed Group: {breedDetails[0].breed_group}</h4>
              <h4>Origin: {breedDetails[0].origin} </h4>
              <h4>Temperaments: {breedDetails[0].temperament}</h4>
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
              {console.log(breedDetails)}
              <h2>{breedDetails.name}</h2>
              <h3>Height: {breedDetails.height} cm</h3>
              <h3>Weight: {breedDetails.weight} kg</h3>
              <h3>Life Span: {breedDetails.life_span} años</h3>
              <h4>
                Temperaments:
                {breedDetails.temperaments &&
                  breedDetails.temperaments.map((el) => el.name).join(", ")}
              </h4>
            </div>
          </div>
        )}
        <br />
        <Link to="/home">
          <button className="reset-btn">Back</button>
        </Link>
      </div>
    </div>
  );
}
