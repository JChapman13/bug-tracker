const express = require("express");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const employeesRoute = require("./routes/employees");
const ticketsRoute = require("./routes/tickets");
const projectsRoute = require("./routes/projects");
const directoryRoute = require("./routes/directory");
const dashboardRoute = require("./routes/dashboard");
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
/*----------Unprotected routes here ----*/

app.use("/api", employeesRoute);
app.use(require("./config/auth"));

app.use("/api", dashboardRoute);
app.use("/api", projectsRoute);
app.use("/api", ticketsRoute);
app.use("/api", directoryRoute);
/*---------- Protected Routes ----------*/

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
