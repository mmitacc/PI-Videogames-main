import {
  GET_VIDEOGAMES,
  GET_VGAMES_DETAIL,
  CREATE_VIDEOGAME,
  GET_GENRES,
} from "./action-type.js";
// Importar las action-types

const initialState = {
  videoGames: [],
  vGamesDetail: {},
  genres: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
