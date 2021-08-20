const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  createcategory,
  fetchAllCategories,
} = require("../controllers/categoryControllers");

// REVIEW: It should be `/categories`.
// Also `/categories` should be in app.js
router.get("/category", fetchAllCategories);
// REVIEW: don't put verbs in your paths
// It should be `/categories`, we will know that it's a create from the post and controller name
router.post("/createcategory", upload.single("image"), createcategory);

module.exports = router;
