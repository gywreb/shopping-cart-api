const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

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
    },
    password: {
      type: String,
      minlength: [6, "name must be at least 6 characters"],
      required: [true, "password is required"],
    },
    role: {
      type: Number,
      required: [true, "role is required"],
      default: 0, //guest
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

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
