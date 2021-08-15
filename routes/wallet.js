const router = require("express").Router();
const passport = require("passport");

const {
  createWallet,
  fetchAllWallets,
} = require("../controllers/walletControllers");

router.get("/wallets", fetchAllWallets);

// router.put("/updateWallet/:auctionId", updateWallet);
router.post("/createWallet", createWallet);

module.exports = router;
