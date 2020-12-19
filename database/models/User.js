const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

mongoose.set("runValidators", true);

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [6, "name must be at least 6 characters"],
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email!"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "name must be at least 6 characters"],
      required: [true, "password is required"],
    },
    role: {
      type: String,
      default: "guest",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { id: false, toJSON: { virtuals: true }, timestamps: true }
);

UserSchema.virtual("role_detail", {
  ref: "Role",
  localField: "role",
  foreignField: "role_name",
  justOne: true,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.passwordValidation = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

UserSchema.statics.generateJwt = function (payload) {
  // generate jwt and return a token when loged in
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.statics.getUserByEmail = async function (email) {
  return await this.findOne({ email }).exec();
};

module.exports = mongoose.model("User", UserSchema, "users");
