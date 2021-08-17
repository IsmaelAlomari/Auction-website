const router = require("express").Router();
const passport = require("passport");
const {
  userFavourite,
  createFavourite,
  removeFavurite,
} = require("../controllers/favouriteConrollers");

router.get("/favourites/:userId", userFavourite);

router.post("/addFavourite", createFavourite);
router.post("/removeFavurite", removeFavurite);

module.exports = router;
