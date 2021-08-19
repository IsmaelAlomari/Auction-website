const Auction = require("../models/Auction");
const Wallet = require("../models/Wallet");

exports.bid = async (req, res, next) => {
  const { userId, auctionId, bid } = req.body;

  const wantedAuction = await Auction.findById(auctionId);
  wantedAuction.bidding.push({
    userId: userId,
    bid: bid,
  });
  wantedAuction.save();

  res.status(201).json(wantedAuction);
};
