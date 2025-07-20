var TaskQueries = require("../models/queries/task.queries.js");
var apiResponses = require("../utils/apiResponses.js");
var validator = require("../middleware/validation/customValidation.js");

function TaskController() {
  this.taskQueries = new TaskQueries();
}

TaskController.prototype.getTasks = async function (req, res) {
  try {
    var tasks =
      req.user.role === "admin"
        ? await this.taskQueries.getAllTasks()
        : await this.taskQueries.getUserTasks(req.user.id);

    return apiResponses.success(res, "Tasks retrieved successfully", tasks);
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

TaskController.prototype.createTask = async function (req, res) {
  try {
    var errors = validator.validateTask(req.body);
    if (errors.length > 0)
      return apiResponses.badRequest(res, errors.join(", "));

    var taskData = req.body;
    taskData.user_id = req.user.id;
    var taskId = await this.taskQueries.createTask(taskData);

    return apiResponses.created(res, "Task created successfully", {
      taskId: taskId,
    });
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

TaskController.prototype.updateTask = async function (req, res) {
  try {
    var errors = validator.validateTask(req.body);
    if (errors.length > 0)
      return apiResponses.badRequest(res, errors.join(", "));

    var affectedRows = await this.taskQueries.updateTask(
      req.params.id,
      req.user.id,
      req.body
    );
    if (affectedRows === 0) {
      return apiResponses.notFound(res, "Task not found or access denied");
    }

    return apiResponses.success(res, "Task updated successfully");
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

TaskController.prototype.deleteTask = async function (req, res) {
  try {
    var affectedRows = await this.taskQueries.softDeleteTask(
      req.params.id,
      req.user.id
    );
    if (affectedRows === 0) {
      return apiResponses.notFound(res, "Task not found or access denied");
    }

    return apiResponses.success(res, "Task deleted successfully");
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

module.exports = TaskController;
