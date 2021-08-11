const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  createcategory,
  fetchAllCategories,
} = require("../controllers/categoryControllers");

router.get("/category", fetchAllCategories);
router.post("/createcategory", upload.single("image"), createcategory);

module.exports = router;
