const Auction = require("../models/Auction");
const Wallet = require("../models/Wallet");
const stripe = require("stripe")(
  "sk_test_51JQBfQGk7rf9P57JjERltky8GEv49Z7TVqrZWi2T2MdzfHntGWflgliP8KfLkuJPCQftwj4n0iOyqvqRvrGNpS7M00r70MOR2P"
);
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

const calculateOrderAmount = async (items) => {
  const price = await Buyer(items[0].id);
  console.log(price, "hereeee");
  return 1400;
};
exports.payment = async (req, res, next) => {
  try {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(items),
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

const Buyer = async (auctionId) => {
  const wantedAuction = await Auction.find({
    _id: auctionId,
  });

  const sort = await wantedAuction[0].bidding.sort((b, a) =>
    a.bid > b.bid ? 1 : b.bid > a.bid ? -1 : 0
  );

  return sort[0].bid;
};
