var express = require("express");
var router = express.Router();
var TaskController = require("../controllers/task.controller.js");
var authMiddleware = require("../middlewares/auth.middleware.js");

// Create an instance of the controller
var taskController = new TaskController();

router.use(authMiddleware.authenticate);

router.get("/", taskController.getTasks.bind(taskController));
router.post("/", taskController.createTask.bind(taskController));
router.put("/:id", taskController.updateTask.bind(taskController));
router.put("/:id/delete", taskController.deleteTask.bind(taskController));

module.exports = router;