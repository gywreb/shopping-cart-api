const Role = require("../database/models/Role");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");

exports.addRole = asyncMiddleware(async (req, res, next) => {
  const { role_name, role_desc } = req.body;
  const newRole = new Role({
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
});

exports.getAllRoles = asyncMiddleware(async (req, res, next) => {
  const roles = await Role.find();
  res.json(new SuccessResponse(200, roles));
});

exports.deleteRoleById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const { deletedCount } = await Role.deleteOneById(id);
  deletedCount === 1
    ? res.json(new SuccessResponse(204, "Successfully deleted!"))
    : next(new ErrorResponse(404, "id not found! delete failed"));
});
