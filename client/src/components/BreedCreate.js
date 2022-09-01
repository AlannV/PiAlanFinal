import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postBreed, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./BreedCreate.css";

function validateForm(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "El nombre es obligatorio";
  }
  if (!input.height) {
    errors.height =
      "Campo obligatorio. Deben ser dos numeros con el siguiente formato 'min - max'";
  }
  if (!input.weight) {
    errors.weight =
      "Campo obligatorio. Deben ser dos numeros con el siguiente formato 'min - max'";
  }
  if (!input.life_span) {
    errors.life_span =
      "Campo obligatorio. Deben ser dos numeros con el siguiente formato 'min - max'";
  }

  return errors;
}

export default function BreedCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleSubmit(e) {
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
    alert("Raza creada correctamente!");

    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: "",
    });
    e.target.reset();
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="breed-main-container">
      <div className="breed-sub-container">
        <nav className="breed-nav">
          <div className="breed-titles">
            <h1>Ingresa los datos de tu raza:</h1>
          </div>
          <Link to="/home">
            <button className="btn">Volver al inicio</button>
          </Link>
        </nav>

        <div className="flex-container">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <div className="form__section">
              <h4>Nombre:</h4>
              <input
                type="text"
                value={input.name}
                name="name"
                required
                placeholder="Nombre"
                onChange={(e) => handleChange(e)}
                className="form__input"
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form__section">
              <h4>Altura minima y maxima:</h4>
              <input
                type="text"
                value={input.height}
                name="height"
                pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                required
                title="La altura debe ser la altura minima seguida de: espacio - espacio y la altura maxima"
                placeholder="Altura... ej: 20 - 35"
                onChange={(e) => handleChange(e)}
                className="form__input"
              />
              {errors.height && <p>{errors.height}</p>}
            </div>

            <div className="form__section">
              <h4>Peso minimo y maximo:</h4>
              <input
                type="text"
                value={input.weight}
                name="weight"
                pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                required
                title="El peso debe ser el peso minimo seguido de: espacio - espacio y el peso maximo"
                placeholder="Peso... ej: 1 - 95"
                onChange={(e) => handleChange(e)}
                className="form__input"
              />
              {errors.weight && <p>{errors.weight}</p>}
            </div>

            <div className="form__section">
              <h4>Espectativa de vida minima y maxima:</h4>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                required
                title="Life span must have a maximum value followed by space - space ( - ) and a minimum value"
                placeholder="Espectativa de vida... ej: 5 - 16"
                onChange={(e) => handleChange(e)}
                className="form__input"
              />
              {errors.life_span && <p>{errors.life_span}</p>}
            </div>
            <div className="form__section">
              <h4>Link de la imagen:</h4>
              <input
                type="text"
                value={input.image}
                name="image"
                placeholder="Imagen... https://..."
                onChange={(e) => handleChange(e)}
                className="form__input"
              />
            </div>

            <div className="form__section">
              <h4>Elije uno o mas temperamentos</h4>

              <select
                onChange={(e) => handleSelect(e)}
                className="select-style"
              >
                {temperaments.map((temp) => {
                  return (
                    <option
                      value={temp.name}
                      key={temp.name}
                      className="form__input"
                    >
                      {temp.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="delete-container">
              <ul>
                {input.temperament.map((el) => (
                  <div>
                    {el} {""}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(el)}
                    >
                      <div className="button">X</div>
                    </button>
                  </div>
                ))}
              </ul>
            </div>

            <br />
            <button type="submit" className="btn">
              Crear raza
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
