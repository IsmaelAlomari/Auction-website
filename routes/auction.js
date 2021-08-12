const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  createAuction,
  updateAuction,
  deleteAuction,
} = require("../controllers/auctionControllers");

router.get("/auctions", fetchAllAuctions);
router.delete("/deleteAuction", deleteAuction);
router.post("/createAuction", upload.array("image", 5), createAuction);
router.put("/updateAuction", upload.array("image", 5), updateAuction);

module.exports = router;
