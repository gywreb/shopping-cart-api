const express = require("express");
const User = require("../database/models/User");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { authorize } = require("../middleware/auth");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.use(authorize);

router.route("/all").get(
  asyncMiddleware(async (req, res, next) => {
    const users = await User.find().select("-password");
    if (!users.length) return next(new ErrorResponse(404, "No user found!"));
    res.json(new SuccessResponse(200, users));
  })
);

router
  .route("/:id")
  .get(
    asyncMiddleware(async (req, res, next) => {
      const { id } = req.params;
      if (!id.trim()) return next(new ErrorResponse(400, "id is empty!"));
      const user = await User.findById(id).select("-password");
      res.json(new SuccessResponse(200, user));
    })
  )
  .delete(
    asyncMiddleware(async (req, res, next) => {
      const { id } = req.params;
      if (!id.trim()) return next(new ErrorResponse(400, "id is empty!"));
      if (req.user.id.includes(id))
        return next(new ErrorResponse(409, "You cant update yourself!"));
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) return next(new ErrorResponse(404, "id not found!"));
      res.json(new SuccessResponse(200, "successfully deleted"));
    })
  )
  .patch(
    asyncMiddleware(async (req, res, next) => {
      const { id } = req.params;
      const { name, email, password } = req.body;
      if (!id.trim()) return next(new ErrorResponse(400, "id is empty!"));
      if (req.user.id.includes(id))
        return next(new ErrorResponse(409, "You cant update yourself!"));
      // const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      //   new: true,
      // });
      const user = await User.findById(id);
      if (!user) return next(new ErrorResponse(404, "id not found!"));
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      await user.save();
      res.json(
        new SuccessResponse(200, {
          message: "successfully updated",
          user,
        })
      );
    })
  );

module.exports = router;
