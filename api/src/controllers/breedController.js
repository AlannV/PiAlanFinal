const { Breed, Temperament } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY, BREEDS_URL, BREEDS_QUERY } = process.env;
const { v4: uuidv4 } = require("uuid");

function addBreed(request, response, next) {
  const id = uuidv4();
  let { name, height, weight, life_span, createdInDb, image, temperament } =
    request.body;

  if (image === "")
    image = "https://subirimagenes.online/data/20220816005347214359-scaled.jpg";

  const breedCreated = Breed.create({
    name,
    height,
    weight,
    life_span,
    createdInDb,
    image,
    temperament,
    id,
  });

  const temperamentDb = Temperament.findAll({
    where: { name: temperament },
  });

  Promise.all([breedCreated, temperamentDb])
    .then((res) => {
      let [breedCreatedRes, temperamentDbRes] = res;
      return response.send(breedCreatedRes.addTemperament(temperamentDbRes));
    })
    .catch((err) => next(err));
}

function getAllBreeds(request, response, next) {
  const { name, API_KEY } = request.query;
  if (name) {
    const breedApi = axios.get(`${BREEDS_QUERY}?name=${name}`);
    const breedMine = Breed.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      where: {
        name: {
          [Op.substring]: `${name}`,
        },
      },
    });
    Promise.all([breedApi, breedMine])
      .then((res) => {
        let [breedApiResponse, breedMineResponse] = res;
        console.log(breedApiResponse.data);

        return response.send(breedMineResponse.concat(breedApiResponse.data));
      })
      .catch((err) => next(err));
  } else {
    const breedApi = axios.get(`${BREEDS_URL}?api_key=${API_KEY}`);
    const breedMine = Breed.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    Promise.all([breedApi, breedMine])
      .then((res) => {
        let [breedApiResponse, breedMineResponse] = res;
        return response.send(breedMineResponse.concat(breedApiResponse.data));
      })

      .catch((err) => next(err));
  }
}

function getById(request, response, next) {
  const { API_KEY } = request.query;
  const { id } = request.params;

  if (id < 265) {
    axios
      .get(`${BREEDS_URL}`)
      .then((b) => {
        let findId = b.data.filter((idApi) => idApi.id === parseInt(id));
        response.send(findId);
      })
      .catch((err) => next(err));
  } else {
    Breed.findByPk(id, {
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
      .then((b) => {
        response.send(b);
      })
      .catch((err) => next(err));
  }
}

module.exports = {
  getAllBreeds,
  addBreed,
  getById,
};
