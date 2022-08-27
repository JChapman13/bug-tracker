const express = require("express");
const router = express.Router();
const employeesCtrl = require("../controllers/employees");

router.post("/create-employee", employeesCtrl.create);
router.get("/employees", employeesCtrl.getEmployees);
// router.post("/login", usersCtrl.login);

module.exports = router;
