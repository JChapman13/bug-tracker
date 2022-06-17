const express = require("express");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const usersRoute = require("./routes/users");
const ticketsRoute = require("./routes/tickets");
const projectsRoute = require("./routes/projects");
const teamsRoute = require("./routes/teams");
const dashboardRoute = require("./routes/dashboard");
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
/*----------Unprotected routes here ----*/

app.use("/api", usersRoute);
/*---------- Protected Routes ----------*/
app.use(require("./config/auth"));

app.use("/api", dashboardRoute);
app.use("/api", usersRoute);
app.use("/api", projectsRoute);
app.use("/api", ticketsRoute);
app.use("/api", teamsRoute);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
