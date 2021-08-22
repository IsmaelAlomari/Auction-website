const router = require("express").Router();
const passport = require("passport");
// Stripe

const {
  createWallet,
  fetchAllWallets,
  addBalance,
  decBalance,
  payment,
  paymentMethod,
} = require("../controllers/walletControllers");

router.get("/wallets", fetchAllWallets);

router.post("/addbalance", addBalance);

router.post("/decbalance", decBalance);
router.post("/createWallet", createWallet);

router.post("/create-payment-intent", payment);


router.post("/create-checkout-session", paymentMethod);

module.exports = router;
