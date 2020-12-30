const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { jwtAuth, authorize } = require("../middleware/auth");
const mongoUpload = require("../middleware/mongoUpload");

router.use(jwtAuth);

router
  .route("/")
  .get(authorize("admin"), productController.getAllProducts)
  .post(mongoUpload.single("image"), productController.createNewProduct);

router
  .route("/:productId")
  .get(authorize("admin"), productController.getProductById)
  .delete(authorize("admin"), productController.deleteProductById);

module.exports = router;
