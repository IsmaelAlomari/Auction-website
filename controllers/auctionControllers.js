const Auction = require("../models/Auction");

exports.fetchAllAuctions = async (req, res, next) => {
  try {
    let allAuctions = await Auction.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    )
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
