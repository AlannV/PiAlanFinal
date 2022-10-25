import React, { useState, useEffect } from "react";
import { v4 as randomId } from "uuid";

import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  postBreed,
  getTemperaments,
  startUploadingFiles,
  getBreeds,
} from "../actions/index";

import formReq from "./FormReq.js";
import "./BreedCreate.css";
import Card from "./Card";

const requirements = formReq;

const initialState = requirements.reduce((acc, curr) => {
  acc[curr.name] = curr.initialState;
  return acc;
}, {});

var value = "";
var typeOfForm = "";

function BreedCreate(_requirements) {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState({
    ...initialState,
  });

  const [img, setImg] = useState({});

  temperaments.map((temp) => {
    requirements[5].existingOptions.push({
      value: temp.name,
      label: temp.name,
    });
  });

  const imgCloudinary = useSelector((state) => state.productImg);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleDelete(name, sel) {
    setInput({
      ...input,
      [name]: input[name].filter((cat) => cat !== sel),
    });
  }

  function handleChange(e, option, type) {
    if (type === "text") {
      setInput({
        ...input,
        [option]: e.target.value,
      });
    }
    if (type === "select") {
      setInput({
        ...input,
        [option]: [...input[option], e.target.value],
      });
      console.log(input);
    }
    if (type === "file") {
      setImg({ file: URL.createObjectURL(e.target.files[0]) });
      dispatch(startUploadingFiles(e.target.files));
    }
  }

  function handleSubmit(e) {
    console.log(input);
    input.image = imgCloudinary;
    if (
      !input.name ||
      input.name.includes("  ") ||
      !input.height ||
      !input.weight ||
      !input.life_span
    ) {
      return alert("Ingrese todos los campos obligatorios");
    }

    e.preventDefault();

    dispatch(postBreed(input));

    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: "",
    });

    dispatch(getBreeds());
    history.push("/home");
  }

  return input === {} || input === undefined || input === null ? (
    <div> loading... </div>
  ) : (
    <div className={"home-main-container"}>
      <div className={"form-title-container"}>
        <h1 className={"form-title"}>Create Your Own Breed</h1>
      </div>
      <div className={"form-sub-container"}>
        <form onSubmit={(e) => handleSubmit(e)} className={"form-syle"}>
          {requirements.map((req) => {
            value = req.name;
            typeOfForm = req.type;

            let text = typeOfForm === "text";
            let number = typeOfForm === "number";
            let url = typeOfForm === "textUrl";

            let select = typeOfForm === "select";
            let file = typeOfForm === "file";

            if (text || number || url) {
              return (
                <div key={req.id} className={"text-number-container"}>
                  <label
                    htmlFor={req.name}
                    key={req.id}
                    className={"label-style"}
                  >
                    {req.label + " : "}
                  </label>
                  <input
                    key={req.name}
                    type={req.type}
                    value={input.value}
                    name={req.name}
                    required={req.required}
                    placeholder={req.placeholder}
                    onChange={(e) => handleChange(e, req.name, req.type)}
                    className={"input-style"}
                  />
                </div>
              );
            }

            if (select) {
              return (
                <div key={req.id} className={"select-container"}>
                  <label
                    htmlFor={req.prop}
                    key={randomId}
                    className={"label-style"}
                  >
                    {req.label + " : "}
                  </label>
                  <select
                    required={req.required}
                    onChange={(e) => handleChange(e, req.name, req.type)}
                    className="select-style"
                  >
                    <option key={0} value={0} className={"select-option"}>
                      Select {req.label}
                    </option>
                    {req.existingOptions
                      .sort((a, b) => (a < b ? -1 : 1))
                      .map((option) =>
                        !input[req.name].includes(option.value) ? (
                          <option
                            key={randomId()}
                            value={option.value}
                            className={"select-option"}
                          >
                            {option.label}
                          </option>
                        ) : null
                      )}
                  </select>
                  {input[req.name].map((sel) => (
                    <div key={sel} className={"select-delete-container"}>
                      <label htmlFor={sel} className={"select-delete-option"}>
                        {sel}
                      </label>
                      <button
                        onClick={(e) => handleDelete(req.name, sel)}
                        className={"select-delete-button"}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              );
            }

            if (file) {
              return (
                <div key={req.id} className={"file-container"}>
                  <label
                    htmlFor={req.prop}
                    key={randomId}
                    className={"label-style"}
                  >
                    {req.label + " : "}
                  </label>
                  <input
                    type="file"
                    name={req.name}
                    id={req.name}
                    onChange={(e) => handleChange(e, req.name, req.type)}
                    className={"file-input"}
                  />
                </div>
              );
            }
            return null;
          })}
          <br />
          <button type="submit" className="reset-btn">
            Submit
          </button>
        </form>
      </div>
      <div>
        <Card
          image={img.file}
          name={input.name}
          temperament={input.temperament.toString()}
          weight={input.weight}
          height={input.height}
          life_span={input.life_span}
        />
      </div>
      <Link to="/home">
        <button className={"reset-btn"}>Back</button>
      </Link>
    </div>
  );
}

export default BreedCreate;
