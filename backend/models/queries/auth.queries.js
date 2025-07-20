var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var jwtConfig = require("../../config/jwt.config.js");
var MyQueryBuilder = require("../queryBuilder.js");

// https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5

/*
class AuthQueries extends MyQueryBuilder {
  constructor () {
    super("users");
  }
}
  */

// constructor Function named AuthQueries
function AuthQueries() {
  // It can be used to invoke (call) a method with an object as an argument (parameter).
  // This is calling the MyQueryBuilder constructor, but binding it to the current context (this), which is an instance of AuthQueries.
  MyQueryBuilder.call(this, "users");
}

// This sets up prototypal inheritance.
// Object.create(...) creates a new object with MyQueryBuilder.prototype as its prototype.
AuthQueries.prototype = Object.create(MyQueryBuilder.prototype);
// This line restores the correct constructor reference.
AuthQueries.prototype.constructor = AuthQueries;

AuthQueries.prototype.register = async function (userData) {
  var hashedPassword = await bcrypt.hash(userData.password, 10);

  var user = {
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || "user",
    is_active: 1,
  };

  return this.create(user);
};

AuthQueries.prototype.login = async function (username, password) {
  var users = await this.find({ username: username, is_active: 1 });
  if (!users || users.length === 0) {
    return null;
  }

  var user = users[0];

  var isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  var token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expiresIn,
    }
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token: token,
  };
};

module.exports = AuthQueries;
