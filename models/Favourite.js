const mongoose = require("mongoose");

//import the slug package
const slug = require("mongoose-slug-generator");
//Initialize
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  auctionId: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
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

const Category = mongoose.model("Favourite", FavouriteSchema);

module.exports = Category;
