const { ErrorResponse } = require("../model/ErrorResponse");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

exports.authorize = async (req, res, next) => {
  let token;
  // check tokem in request cookies
  if (req.cookies.token) token = req.cookies.token;
  if (!token) return next(new ErrorResponse(401, "You are unauthorized!"));
  try {
    // decode token to user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.getUserByEmail(decoded.email);
    next();
  } catch (error) {
    next(new ErrorResponse(401, "You are unauthorized!"));
  }
};
