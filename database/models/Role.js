const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    role_name: {
      type: String,
      enum: ["admin", "guest", "teacher", "supporter"],
      required: [true, "role name is required"],
      unique: true,
    },
    role_desc: {
      type: String,
      required: [true, "role description is required"],
    },
  },
  { timestamps: true }
);

RoleSchema.statics.getOneById = async function (_id) {
  return await this.findOne({ _id }).exec();
};

RoleSchema.statics.deleteOneById = async function (_id) {
  return await this.deleteOne({ _id }).exec();
};
module.exports = mongoose.model("Role", RoleSchema, "roles");
