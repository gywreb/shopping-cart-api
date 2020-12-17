const { ErrorResponse } = require("../model/ErrorResponse");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

exports.authorize = async (req, res, next) => {
  let token;
  // check tokem in request cookies or in request header authorization
  if (req.cookies.token) token = req.cookies.token;
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1]; //get bearer token
  if (!token) return next(new ErrorResponse(401, "You are unauthorized!"));
  try {
    // decode token to user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
      req.user = await User.getUserByEmail(decoded.email);
      if (req.user) next();
      else return next(new ErrorResponse(401, "You are unauthorized!"));
    } catch (error) {}
  } catch (error) {
    next(new ErrorResponse(401, "You are unauthorized!"));
  }
};
