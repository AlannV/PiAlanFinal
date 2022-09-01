const { Router } = require("express");
const { getAllTemperaments } = require("../Controllers/temperamentController");

const router = Router();

router.get("/", getAllTemperaments);

module.exports = router;
