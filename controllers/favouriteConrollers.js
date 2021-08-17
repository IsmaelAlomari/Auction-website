const Favourite = require("../models/Favourite");
exports.userFavourite = async (req, res, next) => {
  try {
    let allFavourite = await Favourite.find(
      { userId: req.params.userId },
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
      .populate("auctionId", {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });

    res.json(allFavourite);
  } catch (error) {
    next(error);
  }
};

exports.createFavourite = async (req, res, next) => {
  try {
    const newFavourite = await Favourite.create(req.body);

    res.status(201).json(newFavourite);
  } catch (error) {
    next(error);
  }
};

exports.removeFavurite = async (req, res, next) => {
  const fav = await Favourite.findById(req.body.favId);
  if (!fav) {
    next({ status: 404, message: "Auction Not Found" });
  } else {
    fav.remove();
    res.status(201).json({ msg: "deleted" });
  }
};
