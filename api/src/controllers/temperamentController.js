const { Temperament } = require("../db");

function allTemperaments(arrayStr) {
  let arrayTemp = [];

  for (let i = 0; i < arrayStr?.length; i++) {
    let element = arrayStr[i]?.split(", ");

    for (let j = 0; j < element?.length; j++) {
      arrayTemp.push(element[j]);
    }
  }
  return arrayTemp;
}

function filterDuplicates(arrayAllTemp) {
  let map = {};
  let arrayFiltered = [];

  for (let index = 0; index < arrayAllTemp.length; index++) {
    if (!(arrayAllTemp[index] in map)) {
      map[arrayAllTemp[index]] = true;

      arrayFiltered.push(arrayAllTemp[index]);
    }
  }
  return arrayFiltered;
}

function getAllTemperaments(_request, response, next) {
  Temperament.findAll()
    .then((temp) => {
      return response.send(temp);
    })

    .catch((err) => next(err));
}

module.exports = {
  allTemperaments,
  filterDuplicates,
  getAllTemperaments,
};
