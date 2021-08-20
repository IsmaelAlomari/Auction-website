const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");

// REVIEW: why are you fetching all users?
exports.fetchAllUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    res.json(foundUsers);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    // REVIEW: if you're not using `newWallet` you dont have to save the value
    const newWallet = await Wallet.create({ userId: newUser._id });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = generateToken(req.user);
  await res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

// REVIEW: Why are you fetching the user???
exports.fetchUser = async (req, res, next) => {
  try {
    // You're not allowed to send the user ID in the body </3
    // You get the user ID from the token
    const foundUser = await User.findById(req.body._id);
    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};

exports.createFavourite = async (req, res, next) => {
  try {
    // REVIEW: Don't pass the ID in the body,
    // it should come from the jwt strategy through the token
    const foundUser = await User.findById(req.body.userId);
    if (foundUser.fav.includes(req.body.auctionId))
      res.json({ message: "already fav" });
    else foundUser.fav.push(req.body.auctionId);
    foundUser.save();

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};

exports.removeFavurite = async (req, res, next) => {
  try {
    // REVIEW: Don't pass the ID in the body,
    // it should come from the jwt strategy through the token
    const foundUser = await User.findById(req.body.userId);
    if (foundUser.fav.includes(req.body.auctionId)) {
      foundUser.fav.pull(req.body.auctionId);
      foundUser.save();
    } else res.json({ message: "auction not found" });

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};
