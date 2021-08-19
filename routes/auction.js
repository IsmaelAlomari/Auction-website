const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  createAuction,
  updateAuction,
  deleteAuction,
} = require("../controllers/auctionControllers");
const { bid } = require("../controllers/biddingControllers");

router.get("/auctions", fetchAllAuctions);
router.post("/deleteAuction", deleteAuction);
router.post("/createAuction", upload.array("image", 5), createAuction);
router.post("/bid", bid);

router.put(
  "/updateAuction/:auctionId",
  upload.array("image", 5),
  updateAuction
);

module.exports = router;
