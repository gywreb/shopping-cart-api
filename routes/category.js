const express = require("express");
const { jwtAuth, authorize } = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.use(jwtAuth);

router
  .route("/")
  .get(authorize("admin"), categoryController.getAllCategory)
  .post(categoryController.createNewCategory);
router
  .route("/:categoryId")
  .delete(authorize("admin"), categoryController.deleteCategoryById);

module.exports = router;
