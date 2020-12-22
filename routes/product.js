const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { jwtAuth, authorize } = require("../middleware/auth");

router.use(jwtAuth);

router
  .route("/")
  .get(authorize("admin"), productController.getAllProducts)
  .post(productController.createNewProduct);

router
  .route("/:productId")
  .get(authorize("admin"), productController.getProductById)
  .delete(authorize("admin"), productController.deleteProductById);

module.exports = router;
