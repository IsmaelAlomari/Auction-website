const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  image: [
    {
      type: String,
    },
  ],

  /**
   * @Octowl:
   *
   * These relationship fields should be named for what they actually ARE.
   * e.g. `user` instead of `userId`
   */
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  startingPrice: {
    type: Number,
    required: true,
  },

  minBiddingIncrement: {
    type: Number,
    required: true,

    min: [1, "Cant be less than 1"],
  },

  /**
   * @Octowl:
   *
   * Consider making a `Bid` schema to use for `highestBid` and `secondHighestBid`
   */
  highestBidder: {
    bidderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },
  },

  SecHighestBidder: {
    bidderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // toJSON: { virutuals: true },
  // toObject: { virutuals: true },
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
