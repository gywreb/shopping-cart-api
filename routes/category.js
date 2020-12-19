const express = require("express");
const Category = require("../database/models/Category");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { jwtAuth } = require("../middleware/auth");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.use(jwtAuth);

router
  .route("/")
  .post(
    asyncMiddleware(async (req, res, next) => {
      const { category_id, category_name, category_desc } = req.body;
      const category = await Category.getOneByCategoryId(category_id);
      if (category)
        return next(new ErrorResponse(409, "category is already existed!"));
      const newCategory = new Category({
        category_id,
        category_desc,
        category_name,
      });

      const data = await newCategory.save();
      res.status(201).json(
        new SuccessResponse(201, {
          message: "new category is created!",
          category: data,
        })
      );
    })
  )
  .delete(
    asyncMiddleware(async (req, res, next) => {
      const { id } = req.query;
      const { deletedCount } = await Category.deleteOneById(id);
      deletedCount === 1
        ? res.json(new SuccessResponse(204, "Successfully deleted!"))
        : next(new ErrorResponse(404, "id not found! delete failed"));
    })
  );

module.exports = router;
