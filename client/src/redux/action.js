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
