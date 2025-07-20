require("dotenv").config();
var express = require("express");
var helmet = require("helmet");
var app = express();
var authRoutes = require("./routes/auth.routes.js");
var userRoutes = require("./routes/user.routes.js");
var taskRoutes = require("./routes/task.routes.js");

var port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, function () {
  console.log("Server started on port " + port);
});
