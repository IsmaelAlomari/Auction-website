const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  auctionCreate,
  auctionUpdate,
  auctionDelete,
  winner,
  fetchAuction,
} = require("../controllers/auctionControllers");
const { bid } = require("../controllers/biddingControllers");

router.get("/auctions", fetchAllAuctions);
router.get("/auction/:slug", fetchAuction);

router.post("/auction", auctionDelete);
router.post("/auctions", upload.array("image", 5), auctionCreate);
router.post("/bid", bid);

router.put("/auctions/:auctionId", upload.array("image", 5), auctionUpdate);
router.post("/winner", winner);

module.exports = router;
