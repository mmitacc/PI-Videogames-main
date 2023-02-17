const { Router } = require("express");
// Importar todos los routers;
const {
  getApiRawgGR,
  fillDBwithRawg,
  getGenresDB,
} = require("../Controllers/genresController");

const genresRouter = Router();

// Configurar los routers
genresRouter.get("/", async (req, res) => {
  try {
    let result = await getGenresDB();
    if (!result.length) {
      const getApiExt = await getApiRawgGR();
      await getApiExt.forEach(async (gr) => await fillDBwithRawg(gr));
      result = await getGenresDB();
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

module.exports = genresRouter;
