const { Router } = require("express");
// Importar todos los routers;
const {
  getAllGames,
  searchWordGame,
  searchIdGame,
  createGame,
} = require("../Controllers/videogameController");

const videogameRouter = Router();

// Configurar los routers
videogameRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let result;
  try {
    if (name) {
      result = await searchWordGame(name);
    } else {
      result = await getAllGames();
      if (!result.length) {
        throw Error(
          `No exiten actualmente 'videogames' en la BD para mostrar!`
        );
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

videogameRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await searchIdGame(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

videogameRouter.post("/", async (req, res) => {
  const { name, description, released, rating, platforms, genres } = req.body;
  try {
    const result = await createGame(
      name,
      description,
      released,
      rating,
      platforms,
      genres
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

module.exports = videogameRouter;
