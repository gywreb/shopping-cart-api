const express = require("express");
const { jwtAuth, authorize } = require("../middleware/auth");
const router = express.Router();
const userController = require("../controllers/userController");

router.use(jwtAuth);

router
  .route("/all")
  .get(authorize("admin", "guest"), userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUserById)
  .patch(userController.updateUserById);

module.exports = router;
