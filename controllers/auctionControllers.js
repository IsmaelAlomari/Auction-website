const Auction = require("../models/Auction");

exports.fetchAllAuctions = async (req, res, next) => {
  try {
    let allAuctions = await Auction.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    )
      /**
       * @Octowl:
       *
       * There might be a way to define which fields to exclude as part of the model/schema.
       * That way you won't have to keep excluding these fields manually.
       */
      .populate("userId", {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        password: 0,
        address: 0,
        age: 0,
        nationality: 0,
      })
      .populate("categoryId", { createdAt: 0, updatedAt: 0, __v: 0, image: 0 });
    res.json(allAuctions);
  } catch (error) {
    next(error);
  }
};

/**
 * @Octowl:
 *
 * According to the model, auctions have a user attached.
 * I'm guessing this is the "owner" or "poster" of the auction.
 *
 * This CANNOT be assigned through `req.body`.
 * It HAS to be the authenticated user pulled out of `req.user`.
 * Otherwise, ANYONE can create auctions for ANYONE ELSE as long as they know their user id.
 */
exports.createAuction = async (req, res, next) => {
  try {
    if (req.files)
      req.body.image = req.files.map(
        (file) => `http://${req.get("host")}/media/${file.filename}`
      );
    const newAuction = await Auction.create(req.body);

    res.status(201).json(newAuction);
  } catch (error) {
    next(error);
  }
};

exports.updateAuction = async (req, res, next) => {
  if (req.files)
    req.body.image = req.files.map(
      (file) => `http://${req.get("host")}/media/${file.filename}`
    );

  const _auction = await Auction.findOneAndUpdate(
    { _id: req.body.auctionId },
    req.body,
    { new: true }
  );

  res.status(201).json(_auction);
};

exports.deleteAuction = async (req, res, next) => {
  const auction = await Auction.findById(req.body.auctionId);
  if (!auction) {
    next({ status: 404, message: "Auction Not Found" });
  } else {
    auction.remove();
    res.status(201).json({ msg: "deleted" });
  }
};
