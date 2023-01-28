const express = require("express");
const router = express.Router();
const teamsCtrl = require("../controllers/teams");

router.post("/create-team", teamsCtrl.createTeam);
router.get("/teams", teamsCtrl.getTeam);

module.exports = router;
