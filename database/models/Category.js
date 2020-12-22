const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
});

module.exports = mongoose.model("Category", CategorySchema, "categories");
