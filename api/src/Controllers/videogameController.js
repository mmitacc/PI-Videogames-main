// Importar los modelos;
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const fetch = require("node-fetch");
const { API_KEY_RAWG } = process.env;

//TRAYENDO TODOS LOS "videogames" DE AMBAS APIS (PROPIA Y EXTERNA):
const getAllGames = async () => {
  const getMyDb = await Videogame.findAll({ include: Genre });
  const formatMyDb = getMyDb.map((obj) => {
    return {
      id: "M" + obj.id,
      name: obj.name,
      rating: obj.rating,
      image: "",
      genres: obj.genres.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      }),
    };
  });

  const pagesRawg = [1, 2, 3, 4, 5, 6]; //Cada página del Api Rawg nos trae solo 20 games
  const getApiRawg = await Promise.all(
    pagesRawg.map((page) => {
      return fetch(
        `https://api.rawg.io/api/games?key=${API_KEY_RAWG}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => data.results);
    })
  )
    .then((resp) => resp.reduce((a, b) => a.concat(b)))
    .catch((err) =>
      console.log(
        `Problemas en la Api 'https://rawg.io/apidocs' no se pueden obtener los datos!`,
        err
      )
    );

  const formatApiRawg = getApiRawg.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      rating: obj.rating,
      image: obj.background_image,
      genres: obj.genres.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      }),
    };
  });
  const getAllApis = formatMyDb.concat(formatApiRawg);
  //Ordenando los Videogames por NAME
  getAllApis.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return getAllApis;
};

//FILTRANDO SOLO LOS "videogames" CON LA PALABRA "name" EN TODAS LAS APIS:
const searchWordGame = async (name) => {
  const searchWG = await Videogame.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
    limit: 15,
  });
  if (!searchWG.length) {
    throw Error(`No existe un 'Name of Videogames' con la palabra: '${name}'!`);
  }
  return searchWG;
};

//TRAYENDO SOLO EL "videogame" CON EL INDICE "id" DE TODAS LAS APIS:
const searchIdGame = async (id) => {
  let searchId = {};
  console.log("ID-CONTROLLERS==> ", id);
  if (parseInt(id)) {
    searchId = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY_RAWG}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) =>
        console.log(
          `Problemas en la Api 'https://rawg.io/apidocs' no se pueden obtener los datos!`,
          err
        )
      );
  } else {
    id = id.slice(1);
    console.log("ID-CONTROLLERS-MODEL==> ", id);
    searchId = await Videogame.findOne({
      where: { id },
      include: Genre,
      through: {
        attributes: [],
      },
    });
    searchId = JSON.parse(JSON.stringify(searchId));
  }
  if (!searchId) {
    throw Error(`No existe el ID: '${id}' en la DB 'Videogames'!`);
  }
  console.log("1-GET --MYAPI-: SsearchId==> ", searchId);
  return {
    id: searchId.id,
    name: searchId.name,
    rating: searchId.rating,
    description: searchId.description ? searchId.description : null,
    released: searchId.released,
    image: searchId.background_image ? searchId.background_image : null,
    genres: searchId.genres?.map((gen) => {
      return {
        id: gen.id,
        name: gen.name,
      };
    }),
    platforms: searchId.platforms?.map((pf, index) => {
      return {
        id: pf.platform ? pf.platform.id : index,
        name: pf.platform ? pf.platform.name : pf,
      };
    }),
  };
};

//Función generadora de ID para el "model Videogame":
function* functionGeneratorId() {
  let number = 1; //Número entero INICIAL a generar
  while (true) {
    yield number;
    number = number + 1;
  }
}
let generatorId = functionGeneratorId();

//CREANDO UN NUEVO "videogame" CON UN INDICE "autogenerado: functionGeneratorId()":
const createGame = async (
  name,
  description,
  release_date,
  rating,
  platforms,
  genres
) => {
  console.log("GENEROS LLENADOS", genres);
  if (![name, description, platforms].every(Boolean)) {
    throw Error("(*) Faltan llenar algunos campos que son obligatorios!");
  }
  const newGame = await Videogame.create({
    // id: "M" + generatorId.next().value,
    name,
    description,
    release_date,
    rating,
    platforms,
  });
  //aquí se agregan los "generos" de cada juego con el metodo "add"
  await newGame.addGenres(genres);
  return newGame;
};

module.exports = {
  getAllGames,
  searchWordGame,
  searchIdGame,
  createGame,
};
