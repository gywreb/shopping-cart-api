const Product = require("../database/models/Product");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");

exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find().populate("category_detail");
  res.json(new SuccessResponse(200, products));
});

exports.createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { sku, name, price, quantity, description, category } = req.body;
  const newProduct = new Product({
    sku,
    name,
    price,
    quantity,
    description,
    category,
    image: req.file.filename,
  });
  console.log(req.file);
  const product = await newProduct.save();
  res.status(201).json(new SuccessResponse(201, product));
});

exports.deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct)
    return next(new ErrorResponse(404, "product id not found"));
  res.json(new SuccessResponse(200, `produuc has id ${productId} id deleted`));
});

exports.getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate("category_detail");
  if (!product) return next(new ErrorResponse(404, "product id not found"));
  res.json(new SuccessResponse(200, product));
});
