const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "please, password can't be less than 6 charaacter"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
    min: [18, "Age must be above 18"],
  },
  phoneNum: {
    type: Number,
  },

  nationality: {
    type: String,
  },

  fav: [
    {
      type: Schema.Types.ObjectId,
      ref: "Auction",
      unique: true,
    },
  ],

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

const User = mongoose.model("User", userSchema);

module.exports = User;
