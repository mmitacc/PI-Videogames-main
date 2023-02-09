const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { createGame } = require("../Controllers/index");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", (req, res) => {
  res.status(200).json({ all: "ok" });
});

router.get("/videogames", (req, res) => {
  res.status(200).json({ all: "ok" });
});

router.get("/videogames/:id", (req, res) => {
  res.status(200).json({ all: "ok" });
});

router.post("/videogames", async (req, res) => {
  try {
    const { name, description, release_date, rating, platforms } = req.body;
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

router.post("/genres", (req, res) => {
  res.status(200).json({ all: "ok" });
});

module.exports = router;
