var MyQueryBuilder = require("../queryBuilder.js");

// Yeh mera constructor function hain (basically subclass)
function TaskQueries() {
  // Call the parent constructor with "tasks" as the table name
  MyQueryBuilder.call(this, "tasks");
}

// prototype of TQ constructor is an o object whose prototype is prototype of object created using MyQueryBuilder
TaskQueries.prototype = Object.create(MyQueryBuilder.prototype);

// Reset the constructor property to refer to TaskQueries
TaskQueries.prototype.constructor = TaskQueries;

TaskQueries.prototype.getUserTasks = function (userId) {
  return this.find({ user_id: userId, is_active: 1 });
};

TaskQueries.prototype.createTask = function (taskData) {
  return this.create(taskData);
};

TaskQueries.prototype.updateTask = function (taskId, userId, taskData) {
  return this.update({ id: taskId, user_id: userId }, taskData);
};

TaskQueries.prototype.softDeleteTask = function (taskId, userId) {
  return this.update({ id: taskId, user_id: userId }, { is_active: 0 });
};

TaskQueries.prototype.getAllTasks = function () {
  return this.find({ is_active: 1 });
};

module.exports = TaskQueries;
