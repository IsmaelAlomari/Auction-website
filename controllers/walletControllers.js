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

// exports.updateAuction = async (req, res, next) => {
//   if (req.file) {
//     req.body.image = `http://${req.get("host")}/upload/${req.file.filename}`;
//   }
//   let auction = await Auction.findByIdAndUpdate(
//     { _id: req.params.auctionId },
//     req.body
//   );
//   auction = await auction.populate("auctions").execPopulate();
//   res.status(201).json(auction);
// };
