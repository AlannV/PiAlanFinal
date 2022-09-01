import axios from "axios";
import {
  BREEDS_LOCAL_URL,
  GET_BREEDS,
  FILTER_BY_TEMPERAMENT,
  TEMPERAMENTS_LOCAL_URL,
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  FILTER_CREATED_DB,
  GET_DETAILS,
  ORDER_BY_BREED,
  ORDER_BY_WEIGHT,
} from "../entorno.js";

export function getBreeds() {
  return async function (dispatch) {
    var json = await axios.get(`${BREEDS_LOCAL_URL}`, {});
    return dispatch({
      type: GET_BREEDS,
      payload: json.data,
    });
  };
}

export function filterBreedsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get(`${TEMPERAMENTS_LOCAL_URL}`, {});
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

export function postBreed(payload) {
  return async function (dispatch) {
    const json = await axios.post(`${BREEDS_LOCAL_URL}`, payload);
    console.log(json);
    return json;
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${BREEDS_LOCAL_URL}?name=` + name, {});
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreatedDb(payload) {
  return {
    type: FILTER_CREATED_DB,
    payload,
  };
}

export function orderByBreed(payload) {
  return {
    type: ORDER_BY_BREED,
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${BREEDS_LOCAL_URL}` + id);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
