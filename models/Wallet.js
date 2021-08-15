const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
