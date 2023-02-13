// Importar los modelos;
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const fetch = require("node-fetch");

const getAllGames = async () => {
  const getGames = await Videogame.findAll();
  if (!getGames.length) {
    throw Error(`No existen 'Videogames' actualmente en la 'BD'!`);
  }
  return getGames;
};

const searchWordGame = async (name) => {
  const searchWG = await Videogame.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
    limit: 2,
  });
  if (!searchWG.length) {
    throw Error(`No existe un 'Name of Videogames' con la palabra: '${name}'!`);
  }
  return searchWG;
};

const searchIdGame = async (id) => {
  const searchId = await Videogame.findAll({
    where: {
      id: id,
    },
  });
  if (!searchId.length) {
    throw Error(`No existe el ID: '${id}' en la DB 'Videogames'!`);
  }
  return searchId;
};

//Función generadora de ID para el "model Videogame":
function* functionGeneratorId() {
  let number = 5000;
  while (true) {
    yield number;
    number = number + 1;
  }
}
let generatorId = functionGeneratorId();
//----------------------------------------------------

const createGame = async (
  name,
  description,
  release_date,
  rating,
  platforms
) => {
  if (![name, description, platforms].every(Boolean)) {
    throw Error("(*) Faltan llenar algunos campos que son obligatorios!");
  }
  const newGame = await Videogame.create({
    id: generatorId.next().value,
    name,
    description,
    release_date,
    rating,
    platforms,
  });
  return newGame;
};

const getApiRawg = () => {
  const getGR = fetch(
    "https://api.rawg.io/api/genres?key=4b1922756e374dfe8517da432e4def0a"
  )
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) =>
      console.log(
        `Problemas en la Api 'https://rawg.io/apidocs' no se pueden obtener los datos!`,
        err
      )
    );
  return getGR;
};

const fillDBwithRawg = async (gr) => {
  const { id, name } = gr;
  const newGenres = await Genre.create({
    id,
    name,
  });
  console.table(gr);
  // return newGenres;
};

const getGenresDB = async () => {
  const getGrDb = await Genre.findAll();
  return getGrDb;
};

module.exports = {
  createGame,
  getAllGames,
  searchWordGame,
  searchIdGame,
  getApiRawg,
  fillDBwithRawg,
  getGenresDB,
};
