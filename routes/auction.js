const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  auctionCreate,
  auctionUpdate,
  auctionDelete,
} = require("../controllers/auctionControllers");
const { bid } = require("../controllers/biddingControllers");

router.get("/auctions", fetchAllAuctions);
router.post("/auction", auctionDelete);
router.post("/auctions", upload.array("image", 5), auctionCreate);
router.post("/bid", bid);

router.put("/auctions/:auctionId", upload.array("image", 5), auctionUpdate);

module.exports = router;
