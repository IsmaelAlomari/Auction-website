const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  fetchAllAuctions,
  createAuction,
  updateAuction,
  deleteAuction,
} = require("../controllers/auctionControllers");

// REVIEW: remove the words delete, create and update.
// They should all be /auctions, the difference is the method, get, post, etc.
// Also move the word `/auctions` to `app.js`
router.get("/auctions", fetchAllAuctions);
router.post("/deleteAuction", deleteAuction);
router.post("/createAuction", upload.array("image", 5), createAuction);
router.put(
  "/updateAuction/:auctionId",
  upload.array("image", 5),
  updateAuction
);

module.exports = router;
