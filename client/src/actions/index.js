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
  CLEAR_DETAIL,
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
    const json = await axios
      .post(`${BREEDS_LOCAL_URL}`, payload)
      .then((res) => res.status === 200 && alert("Breed created successfully"));
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
      console.log(json.data);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail() {
  return { type: CLEAR_DETAIL };
}

const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos archivo para subir");
  const cloudUrl = "https://api.cloudinary.com/v1_1/cinematime/upload";
  const formData = new FormData();
  formData.append("upload_preset", "cinema"); //? 'método Cloudinary', 'Cloud Name asignado en Cloudinary'
  formData.append("file", file); //? 'lo que espera Cloudinary', 'arg'
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export function startUploadingFiles(payload) {
  return async (dispatch) => {
    console.log("THUNK-files: ", payload);
    let prueba = await fileUpload(payload[0]).then((s) => {
      dispatch({
        type: "GET_CLOUDINARY_IMG",
        payload: s,
      });
    });
  };
}
