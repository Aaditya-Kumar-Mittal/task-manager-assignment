var validator = {
  validateRegister: function (data) {
    var errors = [];
    if (!data.username || typeof data.username !== "string")
      errors.push("Invalid or missing username");
    if (!data.email || !data.email.includes("@"))
      errors.push("Invalid or missing email");
    if (!data.password || data.password.length < 6)
      errors.push("Password must be at least 6 characters");
    return errors;
  },

  validateLogin: function (data) {
    var errors = [];
    if (!data.username) errors.push("Username is required");
    if (!data.password) errors.push("Password is required");
    return errors;
  },

  validateTask: function (data) {
    var errors = [];
    if (!data.title || typeof data.title !== "string")
      errors.push("Title is required");
    if (data.due_date && isNaN(Date.parse(data.due_date)))
      errors.push("Invalid due date format");
    return errors;
  },

  validateUserUpdate: function (data) {
    var errors = [];
    if (data.username && typeof data.username !== "string")
      errors.push("Invalid username");
    if (data.email && !data.email.includes("@")) errors.push("Invalid email");
    if (data.password && data.password.length < 6)
      errors.push("Password too short");
    return errors;
  },
};

module.exports = validator;
