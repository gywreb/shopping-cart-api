const express = require("express");
const Category = require("../database/models/Category");
const { authorize } = require("../middleware/auth");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.use(authorize);

router.post("/", async (req, res, next) => {
  const { category_id, category_name, category_desc } = req.body;
  const category = await Category.getOneByCategoryId(category_id);
  if (category)
    return next(new ErrorResponse(409, "category is already existed!"));
  const newCategory = new Category({
    category_id,
    category_desc,
    category_name,
  });
  try {
    const data = await newCategory.save();
    res.status(201).json(
      new SuccessResponse(201, {
        message: "new category is created!",
        category: data,
      })
    );
  } catch (error) {
    let reqError = {};
    for (let err in error.errors) {
      reqError[err] = error.errors[err].message;
    }
    next(new ErrorResponse(400, reqError));
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { deletedCount } = await Category.deleteOneById(id);
    deletedCount === 1
      ? res.json(new SuccessResponse(204, "Successfully deleted category!"))
      : next(new ErrorResponse(404, "category not found!"));
  } catch (error) {
    next(new ErrorResponse(404, "category not found!"));
  }
});

module.exports = router;
