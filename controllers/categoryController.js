const Category = require("../database/models/Category");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");

exports.getAllCategory = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  res.json(new SuccessResponse(200, categories));
});

exports.createNewCategory = asyncMiddleware(async (req, res, next) => {
  const { name, description } = req.body;
  const newCategory = new Category({ name, description });
  const category = await newCategory.save();
  res.status(201).json(new SuccessResponse(201, category));
});

exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory)
    return next(new ErrorResponse(404, "category not found"));
  res.json(
    new SuccessResponse(200, `category has id ${categoryId} is deleted`)
  );
});
