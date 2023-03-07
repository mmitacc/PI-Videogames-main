import cargandoImage from "../img/cargando.gif";
// Importar las action-types
import {
  GET_VIDEOGAMES,
  GET_VGAMES_DETAIL,
  CREATE_VIDEOGAME,
  GET_GENRES,
  CLEIN_DETAIL,
} from "./action-type.js";

const initialState = {
  videoGames: [],
  vGamesDetail: { image: cargandoImage },
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
    case CLEIN_DETAIL:
      return {
        ...state,
        vGamesDetail: { image: cargandoImage },
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
