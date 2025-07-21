var MyQueryBuilder = require("../queryBuilder.js");
var bcrypt = require("bcrypt");

function UserQueries() {
  MyQueryBuilder.call(this, "users");
}

UserQueries.prototype = Object.create(MyQueryBuilder.prototype);
UserQueries.prototype.constructor = UserQueries;

UserQueries.prototype.getAllUsers = function () {
  return this.find({ is_active: 1 });
};

UserQueries.prototype.deActivateUser = function (userId) {
  return this.update({ id: userId }, { is_active: 0 });
};

UserQueries.prototype.activateUser = function (userId) {
  return this.update({ id: userId }, { is_active: 1 });
};

UserQueries.prototype.updateUser = async function (userId, updateData) {
  if (updateData.password) {
    var hashedPassword = await bcrypt.hash(updateData.password, 10);
    return this.update(
      { id: userId },
      { ...updateData, password: hashedPassword }
    );
  } else {
    return this.update({ id: userId }, updateData);
  }
};

module.exports = UserQueries;
