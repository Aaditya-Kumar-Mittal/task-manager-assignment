var mysql = require("mysql");
var dbConfig = require("../config/db.config.js");

var pool = mysql.createPool(dbConfig);

module.exports = pool;
