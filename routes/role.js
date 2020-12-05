const express = require("express");
const Role = require("../database/models/Role");
const { authorize } = require("../middleware/auth");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");
const router = express.Router();

router.use(authorize);

router.post("/", async (req, res, next) => {
  const { role_id, role_name, role_desc } = req.body;
  const role = await Role.getOneByRoleId(role_id);
  if (role) return next(new ErrorResponse(409, "Role is already existed!"));
  const newRole = new Role({
    role_id,
    role_name,
    role_desc,
  });
  try {
    const data = await newRole.save();
    res.status(201).json(
      new SuccessResponse(201, {
        message: "new role is created!",
        role: data,
      })
    );
  } catch (error) {
    let reqError = {};
    for (let err in error.errors) {
      reqError[err] = error.errors[err].message;
    }
    next(new ErrorResponse(400, reqError));
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { deletedCount } = await Role.deleteOneById(id);
    deletedCount === 1
      ? res.json(new SuccessResponse(204, "Successfully deleted!"))
      : next(new ErrorResponse(404, "role not found!"));
  } catch (error) {
    next(new ErrorResponse(404, "role not found!"));
  }
});

module.exports = router;
