const router = require("express").Router();
const passport = require("passport");
const { userFavourite, createFavourite } = require("../controllers/favouriteConrollers");

router.get("/favourites", userFavourite);

// router.put("/updateWallet/:auctionId", updateWallet);
router.post("/createFavourite", createFavourite);

module.exports = router;
