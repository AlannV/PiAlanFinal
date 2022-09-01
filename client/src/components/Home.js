import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreeds,
  filterBreedsByTemperament,
  filterCreatedDb,
  getTemperaments,
  orderByBreed,
  orderByWeight,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage, setBreedsPerPage] = useState(8);
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState("");
  const indexOfLastBreed = currentPage * breedsPerPage; //8
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; //0
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBreeds());
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: e.target.value,
    });

    dispatch(filterBreedsByTemperament(e.target.value));
  }

  function handleOrderByBreed(e) {
    e.preventDefault();
    dispatch(orderByBreed(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreatedDb(e) {
    setCurrentPage(1);
    dispatch(filterCreatedDb(e.target.value));
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="home-main-container">
      <nav className="nav">
        <Link to="/breed">
          <button className="btn">Crear Raza</button>
        </Link>

        <div className="separador"></div>

        <SearchBar />
      </nav>

      <div className="separador"></div>

      <div className="secondary-container">
        <div className="allBreeds">
          <label className="labels">Filtrar razas por: </label>
          <select
            className="select-style"
            onChange={(e) => handleFilterCreatedDb(e)}
          >
            <option value="all">Existente</option>
            <option value="createdInDb">Creado</option>
          </select>
        </div>

        <div className="temperaments">
          <label className="labels">Temperamento: </label>
          <select className="select-style" onChange={(e) => handleSelect(e)}>
            {temperaments?.map((temp) => {
              return (
                <option key={temp.name} value={temp.name}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="aZ">
          <label className="labels">Ordenar alfabeticamente: </label>
          <select
            className="select-style"
            onChange={(e) => {
              handleOrderByBreed(e);
            }}
          >
            <option value="asc"> A - Z </option>
            <option value="des"> Z - A </option>
          </select>
        </div>

        <div className="minMax">
          <label className="labels">Ordenar por peso:</label>
          <select
            className="select-style"
            onChange={(e) => {
              handleOrderByWeight(e);
            }}
          >
            <option value="minToMax">De mayor a menor peso</option>
            <option value="maxToMin">De menor a mayor peso</option>
          </select>
        </div>
      </div>

      <div className="separador"></div>

      <div className="reset-button">
        <br />
        <button
          className="btn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reset
        </button>
      </div>

      <div className="paginado-cards">
        <br />
        <div className="paginado">
          <Paginado
            breedsPerPage={breedsPerPage}
            allBreeds={allBreeds.length}
            paginado={paginado}
          />
        </div>

        <br />

        <div className="content-cards">
          {currentBreeds?.map((el) => {
            return (
              <div key={el.id}>
                <Link className="link" to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    temperament={el.temperament}
                    weight={el.weight.metric ? el.weight.metric : el.weight}
                    life_span={el.life_span}
                    origin={el.origin}
                    image={
                      el.image
                        ? el.image.url || el.image
                        : "https://cdn2.thedogapi.com/images/" +
                          el.reference_image_id +
                          ".jpg"
                    }
                    key={el.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
