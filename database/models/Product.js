const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      required: [true, "sku is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      default: 1,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
  },
  { id: false, toJSON: { virtuals: true }, timestamps: true }
);

ProductSchema.virtual("category_detail", {
  ref: "Category",
  localField: "category",
  foreignField: "name",
  justOne: true,
});

module.exports = mongoose.model("Product", ProductSchema, "products");
