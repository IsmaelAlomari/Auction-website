const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  categoryCreate,
  fetchAllCategories,
} = require("../controllers/categoryControllers");

router.get("/categories", fetchAllCategories);
router.post("/category", upload.single("image"), categoryCreate);

module.exports = router;
