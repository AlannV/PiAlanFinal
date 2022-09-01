const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const BreedRoutes = require("./breed");
const TemperamentRoutes = require("./temperament");
const DeleteBreed = require("./breed");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/breeds", BreedRoutes);
router.use("/temperament", TemperamentRoutes);

module.exports = router;
