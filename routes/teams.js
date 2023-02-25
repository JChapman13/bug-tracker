const express = require("express");
const router = express.Router();
const teamsCtrl = require("../controllers/teams");

router.post("/create-team", teamsCtrl.createTeam);
router.delete("/delete-team", teamsCtrl.deleteTeam);
router.put("/edit-team", teamsCtrl.editTeam);
router.get("/teams", teamsCtrl.getTeam);

module.exports = router;
