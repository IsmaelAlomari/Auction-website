const Auction = require("../models/Auction");
const Wallet = require("../models/Wallet");
const stripe = require("stripe")(
  "sk_test_51JQBfQGk7rf9P57JjERltky8GEv49Z7TVqrZWi2T2MdzfHntGWflgliP8KfLkuJPCQftwj4n0iOyqvqRvrGNpS7M00r70MOR2P"
);

const YOUR_DOMAIN = "http://localhost:3000/checkout";

exports.fetchAllWallets = async (req, res, next) => {
  try {
    let allWallets = await Wallet.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).populate("userId", {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
      address: 0,
      age: 0,
      nationality: 0,
      fav: 0,
      email: 0,
      phoneNum: 0,
    });
    res.json(allWallets);
  } catch (error) {
    next(error);
  }
};

exports.createWallet = async (req, res, next) => {
  try {
    const newWallet = await Wallet.create(req.body);

    res.status(201).json(newWallet);
  } catch (error) {
    next(error);
  }
};

exports.addBalance = async (req, res, next) => {
  let wallet = await Wallet.findByIdAndUpdate(
    { _id: req.body.walletId },
    {
      $inc: { balance: req.body.amount },
    },
    { new: true }
  );
  res.status(201).json(wallet);
};
const calculateOrderAmount = (items) => {
  return 1700;
};

exports.decBalance = async (req, res, next) => {
  let wallet = await Wallet.findByIdAndUpdate(
    { _id: req.body.walletId },
    {
      $inc: { balance: -req.body.amount },
    },
    { new: true }
  );
  res.status(201).json(wallet);
};
exports.payment = async (req, res, next) => {
  try {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
    });
    res
      .send({
        clientSecret: paymentIntent.client_secret,
      })
      .json("done");
  } catch (error) {
    next(error);
  }
};

const Buyer = async (auctionId) => {
  const wantedAuction = await Auction.find({
    _id: auctionId,
  });
  const heighstBid = wantedAuction.bidding.sort((b, a) =>
    a.bid > b.bid ? 1 : b.bid > a.bid ? -1 : 0
  )[0];
};

exports.paymentMethod = async (req, res, next) => {
  try {
    const { auctionId } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // TODO: replace this with the `price` of the product you want to sell
          price: "price_1JQg94Gk7rf9P57JezeMDWq3",
          // price: Buyer(auctionId).bid,
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
};
