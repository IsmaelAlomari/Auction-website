const router = require("express").Router();
const passport = require("passport");

const {
  signup,
  signin,
  fetchAllUsers,
  fetchUser,
  createFavourite,
  removeFavurite,
} = require("../controllers/userControllers");

router.get("/users", fetchAllUsers);
router.get("/user", fetchUser);

router.post("/signup", signup);
router.post("/addFav", createFavourite);
router.post("/removeFav", removeFavurite);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
