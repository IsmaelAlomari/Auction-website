const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/key");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

exports.fetchUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.body._id);
    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};
