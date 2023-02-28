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
    case GET_VGAMES_DETAIL:
      return {
        ...state,
        vGamesDetail: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videoGames: [...state.videoGames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
