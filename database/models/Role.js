const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
  role_id: {
    type: String,
    enum: ["admin", "guest", "teacher", "support"],
    required: [true, "role id is required"],
  },
  role_name: {
    type: String,
    required: [true, "role name is required"],
  },
  role_desc: {
    type: String,
    required: [true, "role description is required"],
  },
});

RoleSchema.statics.getOneByRoleId = async function (role_id) {
  return await this.findOne({ role_id }).exec();
};

RoleSchema.statics.getOneById = async function (_id) {
  return await this.findOne({ _id }).exec();
};

RoleSchema.statics.deleteOneById = async function (_id) {
  return await this.deleteOne({ _id }).exec();
};
module.exports = mongoose.model("Role", RoleSchema, "roles");
