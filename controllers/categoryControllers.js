const Category = require("../models/Category");

exports.fetchAllCategories = async (req, res, next) => {
  try {
    let allCategories = await Category.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
};

// REVIEW: It should be `createCategory`
exports.createcategory = async (req, res, next) => {
  try {
    if (req.file)
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
