const express = require("express");
const User = require("../database/models/User");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.post(
  "/register",
  asyncMiddleware(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (user)
      return next(
        new ErrorResponse(409, "User with email is already existed!")
      );
    const newUser = new User({
      name,
      email,
      password,
    });
    const data = await newUser.save();
    res.json(
      new SuccessResponse(200, {
        message: `Register successful!`,
        user: data,
      })
    );
  })
);

router.post(
  "/login",
  asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (user) {
      if (await user.passwordValidation(password, user.password)) {
        // get jwt with payload
        const { _id, name, email, role } = user;
        const token = User.generateJwt({ _id, name, email, role });
        // save jwt in cookie with cookie options = cookie(key, value, options)
        res
          .cookie("token", token, {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
          })
          .json(
            new SuccessResponse(200, {
              message: `Welcome back ${user.name}!`,
              token,
            })
          );
      } else next(new ErrorResponse(400, "Password is incorrect!"));
    } else next(new ErrorResponse(404, "User with email not found!"));
  })
);

router.patch(
  "/updatePassword",
  asyncMiddleware(async (req, res, next) => {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user)
      return next(new ErrorResponse(404, "User with email not found!"));
    if (!(await user.passwordValidation(currentPassword)))
      return next(new ErrorResponse(400, "Password is incorrect!"));
    if (await user.passwordValidation(newPassword))
      return next(
        new ErrorResponse(
          409,
          "New password must be different from your old password!"
        )
      );
    user.password = newPassword;
    await user.save();
    res.json(
      new SuccessResponse(200, { message: `Password updated successfully!` })
    );
  })
);

module.exports = router;
