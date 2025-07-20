var jwt = require("jsonwebtoken");
var jwtConfig = require("../config/jwt.config.js");
var apiResponse = require("../utils/apiResponses.js");

var authMiddleware = {
  authenticate: function (req, res, next) {
    var token = req.header("Authorization");
    if (token) {
      token = token.replace("Bearer ", "");
    }

    if (!token) {
      return apiResponse.unauthorized(res, "Access denied. No token provided.");
    }

    try {
      var decoded = jwt.verify(token, jwtConfig.secret); // sync version
      req.user = decoded;
      next();
    } catch (err) {
      return apiResponse.unauthorized(res, "Invalid token.");
    }
  },

  authorize: function (roles) {
    roles = roles || [];

    return function (req, res, next) {
      if (!req.user || roles.indexOf(req.user.role) === -1) {
        return apiResponse.forbidden(
          res,
          "Access denied. You do not have permission to perform this action."
        );
      }
      next();
    };
  },
};

module.exports = authMiddleware;
