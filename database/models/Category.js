const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  category_id: {
    type: String,
    required: [true, "category id is required"],
  },
  category_desc: {
    type: String,
    required: [true, "category description is required"],
  },
  category_name: {
    type: String,
    required: [true, "category name is required"],
  },
});

CategorySchema.statics.getOneByCategoryId = async function (category_id) {
  return await this.findOne({ category_id }).exec();
};

CategorySchema.statics.deleteOneById = async function (_id) {
  return await this.deleteOne({ _id }).exec();
};

module.exports = mongoose.model("Category", CategorySchema, "categories");
