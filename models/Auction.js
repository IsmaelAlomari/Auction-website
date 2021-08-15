const mongoose = require("mongoose");

//import the slug package
const slug = require("mongoose-slug-generator");
//Initialize
mongoose.plugin(slug);
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
  slug: { type: String, slug: "name", unique: true },

  image: [
    {
      type: String,
    },
  ],

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
