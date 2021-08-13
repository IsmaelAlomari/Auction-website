const router = require("express").Router();
const passport = require("passport");

const {
  signup,
  signin,
  fetchAllUsers,
  fetchUser,
} = require("../controllers/userControllers");

router.get("/users", fetchAllUsers);
router.get("/user", fetchUser);

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
