const router = require("express").Router();
const passport = require("passport");

const {
  createWallet,
  fetchAllWallets,
  addBalance,
  decBalance,
} = require("../controllers/walletControllers");

router.get("/wallets", fetchAllWallets);

router.post("/addbalance", addBalance);


router.post("/decbalance", decBalance);
router.post("/createWallet", createWallet);

module.exports = router;
