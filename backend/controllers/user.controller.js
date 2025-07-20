var UserQueries = require("../models/queries/user.queries.js");
var apiResponses = require("../utils/apiResponses.js");
var validator = require("../middlewares/validation.middleware.js");

function UserController() {
  this.userQueries = new UserQueries();
}

UserController.prototype.getUsers = async function (req, res) {
  try {
    var users = await this.userQueries.getAllUsers();
    return apiResponses.success(res, "Users retrieved successfully", users);
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

UserController.prototype.updateUser = async function (req, res) {
  try {
    var errors = validator.validateUserUpdate(req.body);
    if (errors.length > 0)
      return apiResponses.badRequest(res, errors.join(", "));

    var affectedRows = await this.userQueries.updateUser(
      req.params.id,
      req.body
    );
    if (affectedRows === 0) {
      return apiResponses.notFound(res, "User not found");
    }

    return apiResponses.success(res, "User updated successfully");
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

UserController.prototype.deactivateUser = async function (req, res) {
  try {
    var affectedRows = await this.userQueries.deactivateUser(req.params.id);
    if (affectedRows === 0) {
      return apiResponses.notFound(res, "User not found");
    }

    return apiResponses.success(res, "User deactivated successfully");
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

module.exports = UserController;
