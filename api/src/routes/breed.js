const { Router } = require("express");
const {
  getAllBreeds,
  addBreed,
  getById,
  deleteBreed,
} = require("../Controllers/breedController");

const router = Router();

router.get("/", getAllBreeds);
router.get("/:id", getById);
router.post("/", addBreed);

module.exports = router;
