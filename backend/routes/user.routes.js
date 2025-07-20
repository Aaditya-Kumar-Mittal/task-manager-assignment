var express = require("express");
var router = express.Router();
var UserController = require("../controllers/user.controller.js");
var authMiddleware = require("../middlewares/auth.middleware.js");


var userController = new UserController();


router.use(authMiddleware.authenticate);

  router.use(authMiddleware.authorize(["admin"]));

// Routes
router.get("/", userController.getUsers.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.put("/:id/deactivate", userController.deactivateUser.bind(userController));
router.put("/:id/activate", userController.activateUser.bind(userController));

module.exports = router;