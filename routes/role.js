const express = require("express");
const roleController = require("../controllers/roleController");
const { jwtAuth, authorize } = require("../middleware/auth");
const router = express.Router();

router.use(jwtAuth, authorize("admin"));

router.route("/").get(roleController.getAllRoles).post(roleController.addRole);
router.route("/:id").delete(roleController.deleteRoleById);

module.exports = router;
