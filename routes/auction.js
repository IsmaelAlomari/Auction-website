const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  createAuction,
  updateAuction,
  deleteAuction,
} = require("../controllers/auctionControllers");

router.get("/auctions", fetchAllAuctions);
router.post("/deleteAuction", deleteAuction);
router.post("/createAuction", upload.array("image", 5), createAuction);
router.put("/updateAuction/:auctionId", upload.array("image", 5), updateAuction);

module.exports = router;
