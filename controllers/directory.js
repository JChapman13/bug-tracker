const Team = require("../models/Team.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

async function createTeam(req, res) {
  try {
    const team = await Team.create({
      name: req.body.name,
      department: req.body.department,
    });

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  createTeam,
};
