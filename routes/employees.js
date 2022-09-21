const express = require("express");
const router = express.Router();
const employeesCtrl = require("../controllers/employees");

router.post("/create-employee", employeesCtrl.create);
router.put("/edit-employee", employeesCtrl.editEmployee);
router.delete("/delete-employee", employeesCtrl.deleteEmployee);
router.get("/employees", employeesCtrl.getEmployees);
// router.post("/login", usersCtrl.login);

module.exports = router;
