const Wallet = require("../models/Wallet");

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
  console.log(req.body.walletId);
  let wallet = await Wallet.findByIdAndUpdate(
    { _id: req.body.walletId },
    {
      $inc: { balance: -req.body.amount },
    },
    { new: true }
  );
  res.status(201).json(wallet);
};
