const router = require("express").Router();
let User = require("../models/User");
const passport = require("passport");

// const {
//     signup,
//     signin,
//

//     fetchAllUsers,
//   } = require("../controllers/userControllers");

const upload = require("../middleware/multer");

router.get("/users", fetchAllUsers);

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
