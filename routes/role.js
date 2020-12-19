const express = require("express");
const Role = require("../database/models/Role");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { jwtAuth } = require("../middleware/auth");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.use(jwtAuth);

router
  .route("/")
  .post(
    asyncMiddleware(async (req, res, next) => {
      const { role_id, role_name, role_desc } = req.body;
      const role = await Role.getOneByRoleId(role_id);
      if (role) return next(new ErrorResponse(409, "Role is already existed!"));
      const newRole = new Role({
        role_id,
        role_name,
        role_desc,
      });
      const data = await newRole.save();
      res.status(201).json(
        new SuccessResponse(201, {
          message: "new role is created!",
          role: data,
        })
      );
    })
  )
  .delete(
    asyncMiddleware(async (req, res, next) => {
      const { id } = req.query;
      const { deletedCount } = await Role.deleteOneById(id);
      deletedCount === 1
        ? res.json(new SuccessResponse(204, "Successfully deleted!"))
        : next(new ErrorResponse(404, "id not found! delete failed"));
    })
  );

module.exports = router;
