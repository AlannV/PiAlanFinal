import {
  GET_BREEDS,
  FILTER_BY_TEMPERAMENT,
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  FILTER_CREATED_DB,
  ORDER_BY_BREED,
  POST_BREED,
  GET_DETAILS,
  ORDER_BY_WEIGHT,
} from "../entorno.js";

const initialState = {
  breeds: [],
  allBreeds: [],
  temperaments: [],
  allTemperaments: [],
  detail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload,
      };

    case GET_BREEDS_BY_NAME:
      return {
        ...state,
        breeds: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
        allTemperaments: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      const breedsFiltered = state.allBreeds;
      const tempFiltered = breedsFiltered.filter((el) => {
        return el.temperament?.includes(action.payload);
      });
      return {
        ...state,
        breeds: tempFiltered,
      };

    case FILTER_CREATED_DB:
      const totalBreeds =
        action.payload === "createdInDb"
          ? state.allBreeds.filter((el) => el.createdInDb)
          : state.allBreeds.filter((el) => !el.createdInDb);

      return {
        ...state,
        breeds: totalBreeds,
      };

    case POST_BREED:
      return {
        ...state,
      };

    case ORDER_BY_BREED:
      console.log(action.payload);

      let sortBreed =
        action.payload === "asc"
          ? state.breeds.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.breeds.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        breeds: sortBreed,
      };

    case ORDER_BY_WEIGHT:
      let arr = state.breeds.filter((el) => el.weight.metric !== false);

      let sortWeight =
        action.payload === "minToMax"
          ? arr.sort(function (a, b) {
              return (
                b.weight.metric.split(/ - /)[0] -
                a.weight.metric.split(/ - /)[0]
              );
            })
          : arr.sort(function (a, b) {
              return (
                a.weight.metric.split(/ - /)[1] -
                b.weight.metric.split(/ - /)[1]
              );
            });

      return {
        ...state,
        breeds: sortWeight,
      };
    case "GET_CLOUDINARY_IMG":
      //console.log(action.payload)
      return {
        ...state,
        productImg: action.payload,
      };

    default:
      return state;
  }
}
