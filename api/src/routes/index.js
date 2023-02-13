const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  createGame,
  getAllGames,
  searchWordGame,
  searchIdGame,
  getApiRawg,
  fillDBwithRawg,
  getGenresDB,
} = require("../Controllers/index");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let result;
  try {
    if (name) {
      result = await searchWordGame(name);
    } else {
      result = await getAllGames();
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

router.get("/videogames/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const result = await searchIdGame(idVideogame);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

router.post("/videogames", async (req, res) => {
  const { name, description, release_date, rating, platforms } = req.body;
  try {
    const result = await createGame(
      name,
      description,
      release_date,
      rating,
      platforms
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

router.get("/genres", async (req, res) => {
  try {
    let result = await getGenresDB();
    if (!result.length) {
      const getApiExt = await getApiRawg();
      getApiExt.forEach(async (gr) => await fillDBwithRawg(gr));
      result = await getGenresDB();
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

module.exports = router;
