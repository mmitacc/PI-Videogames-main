import {
  GET_VIDEOGAMES,
  GET_VGAMES_DETAIL,
  CREATE_VIDEOGAME,
  GET_GENRES,
} from "./action-type.js";

export const getVideoGames = () => {
  return async function (dispatch) {
    let allApies = await fetch("http://localhost:3001/videogames")
      .then((resp) => resp.json())
      .then((data) => data);
    return dispatch({ type: GET_VIDEOGAMES, payload: allApies });
  };
};

export const getVgamesDetail = (id) => {
  console.log("INGRESO-DETAIL==> ", id);
  return async function (dispatch) {
    let getDetail = await fetch(`http://localhost:3001/videogames/${id}`)
      .then((resp) => resp.json())
      .then((data) => data);
    console.log("ACTION-DETAIL===> ", getDetail);
    return dispatch({ type: GET_VGAMES_DETAIL, payload: getDetail });
  };
};

export const createVideoGames = (payload) => {
  console.log("PAYLOAD CREATE====>  ", payload);
  return async function (dispatch) {
    await fetch("http://localhost:3001/videogames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Registro Exitoso: ", data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    return dispatch({ type: CREATE_VIDEOGAME, payload });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    let allGenres = await fetch("http://localhost:3001/genres")
      .then((resp) => resp.json())
      .then((data) => data);
    return dispatch({ type: GET_GENRES, payload: allGenres });
  };
};
