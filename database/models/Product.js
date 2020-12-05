const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
    default: 1,
  },
  categories: {
    type: [String],
    required: [true, "categories is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});
module.exports = mongoose.model("Product", ProductSchema, "products");
