// Importar los modelos;
const { Videogame } = require("../db");

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
    throw Error("(*) Falta llenar algunos datos obligatorios");
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

module.exports = {
  createGame,
};
