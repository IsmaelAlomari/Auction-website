const mongoose = require("mongoose");

//import the slug package
const slug = require("mongoose-slug-generator");
//Initialize
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
  },
  slug: { type: String, slug: "name", unique: true },

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

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
