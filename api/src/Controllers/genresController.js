const { Genre } = require("../db");
const fetch = require("node-fetch");
const { API_KEY_RAWG } = process.env;

const getApiRawgGR = async () => {
  const getGR = await fetch(
    `https://api.rawg.io/api/genres?key=${API_KEY_RAWG}`
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
  await Genre.create({
    id,
    name,
  });
  console.table(gr);
};

const getGenresDB = async () => {
  const getGrDb = await Genre.findAll();
  //Ordenando los Generos por NAME
  getGrDb.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return getGrDb;
};

module.exports = {
  getApiRawgGR,
  fillDBwithRawg,
  getGenresDB,
};
