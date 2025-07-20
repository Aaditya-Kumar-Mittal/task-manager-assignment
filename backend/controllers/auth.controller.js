var AuthQueries = require("../models/queries/auth.queries.js");
var apiResponses = require("../utils/apiResponses.js");
var validator = require("../middlewares/validation.middleware.js");

function AuthController() {
  this.authQueries = new AuthQueries();
}

AuthController.prototype.register = async function (req, res) {
  try {
    var errors = validator.validateRegister(req.body);
    if (errors.length > 0)
      return apiResponses.badRequest(res, errors.join(", "));

    var userId = await this.authQueries.register(req.body);
    return apiResponses.created(res, "User registered successfully", {
      userId: userId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return apiResponses.conflict(res, "Username or email already exists");
    }
    return apiResponses.serverError(res, error.message);
  }
};

AuthController.prototype.login = async function (req, res) {
  try {
    var errors = validator.validateLogin(req.body);
    if (errors.length > 0)
      return apiResponses.badRequest(res, errors.join(", "));

    var result = await this.authQueries.login(
      req.body.username,
      req.body.password
    );
    if (!result) {
      return apiResponses.unauthorized(res, "Invalid username or password");
    }

    return apiResponses.success(res, "Login successful", result);
  } catch (error) {
    return apiResponses.serverError(res, error.message);
  }
};

module.exports = AuthController;
