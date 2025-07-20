var pool = require("./db.js"); // assume this is your MySQL pool

function MyQueryBuilder(table_name) {
  this.table_name = table_name;
}

MyQueryBuilder.prototype.find = async function (conditions) {
  conditions = conditions || {};

  var self = this;

  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM " + self.table_name;
    var values = [];

    if (Object.keys(conditions).length > 0) {
      var whereClause = " WHERE";
      for (var key in conditions) {
        whereClause += " " + key + " = ? AND";
        values.push(conditions[key]);
      }
      whereClause = whereClause.substring(0, whereClause.length - 4);
      query += whereClause;
    }

    pool.query(query, values, function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

MyQueryBuilder.prototype.findOne = async function (conditions) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM " + self.table_name;
    var values = [];

    if (Object.keys(conditions).length > 0) {
      var whereClause = " WHERE";
      for (var key in conditions) {
        whereClause += " " + key + " = ? AND";
        values.push(conditions[key]);
      }
      whereClause = whereClause.substring(0, whereClause.length - 4);
      query += whereClause;
    }

    query += " LIMIT 1";

    pool.query(query, values, function (err, results) {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

MyQueryBuilder.prototype.create = async function (data) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var keys = Object.keys(data);
    var values = keys.map(function (key) {
      return data[key];
    });

    var placeholders = keys
      .map(function () {
        return "?";
      })
      .join(", ");

    var query =
      "INSERT INTO " +
      self.table_name +
      " (" +
      keys.join(", ") +
      ") VALUES (" +
      placeholders +
      ")";

    pool.query(query, values, function (err, result) {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...data });
    });
  });
};

MyQueryBuilder.prototype.update = async function (conditions, data) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var setClause = "";
    var values = [];

    for (var key in data) {
      setClause += key + " = ?, ";
      values.push(data[key]);
    }
    setClause = setClause.slice(0, -2); // remove last comma

    var query = "UPDATE " + self.table_name + " SET " + setClause;

    if (Object.keys(conditions).length > 0) {
      var whereClause = " WHERE";
      for (var condKey in conditions) {
        whereClause += " " + condKey + " = ? AND";
        values.push(conditions[condKey]);
      }
      whereClause = whereClause.slice(0, -4); // remove last AND
      query += whereClause;
    }

    pool.query(query, values, function (err, result) {
      if (err) return reject(err);
      resolve({ affectedRows: result.affectedRows });
    });
  });
};

MyQueryBuilder.prototype.delete = async function (conditions) {
  var self = this;

  return new Promise(function (resolve, reject) {
    var query = "DELETE FROM " + self.table_name;
    var values = [];

    if (Object.keys(conditions).length > 0) {
      var whereClause = " WHERE";
      for (var key in conditions) {
        whereClause += " " + key + " = ? AND";
        values.push(conditions[key]);
      }
      whereClause = whereClause.substring(0, whereClause.length - 4);
      query += whereClause;
    }

    pool.query(query, values, function (err, result) {
      if (err) return reject(err);
      resolve({ affectedRows: result.affectedRows });
    });
  });
};

module.exports = MyQueryBuilder;
