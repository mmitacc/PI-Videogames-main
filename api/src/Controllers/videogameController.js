// Importar los modelos;
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const getAllGames = async () => {
  const getGames = await Videogame.findAll();
  return getGames;
};

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

const searchIdGame = async (id) => {
  const searchId = await Videogame.findOne({
    where: { id },
    include: Genre,
    through: {
      attributes: [],
    },
  });
  if (!searchId) {
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
  platforms,
  genres
) => {
  console.log("GENEROS LLENADOS", genres);
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
