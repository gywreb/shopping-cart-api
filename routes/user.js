const express = require("express");
const { jwtAuth, authorize } = require("../middleware/auth");
const router = express.Router();
const userController = require("../controllers/userController");

router.use(jwtAuth);

router.route("/all").get(authorize("admin"), userController.getAllUsers);
router
  .route("/:id")
  .get(authorize("admin"), userController.getUserById)
  .delete(authorize("admin"), userController.deleteUserById)
  .patch(userController.updateUserById);

module.exports = router;
