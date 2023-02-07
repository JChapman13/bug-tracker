const Team = require("../models/Team.js");
const Employee = require("../models/Employee.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;
const JWT_SECRET = process.env.JWT_SECRET;

async function createTeam(req, res) {
  const { teamName, leader, employees } = req.body;
  console.log(teamName);
  console.log(leader);
  console.log(employees);
  try {
    const team = await Team.create({
      name: teamName,
      leader: leader,
      users: employees,
    });
    const token = jwt.sign({ team }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getTeam(req, res) {
  try {
    const teams = await Team.find({});
    console.log(teams);
    const token = jwt.sign({ teams }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteTeam(req, res) {
  console.log(req.body);
  try {
    const id = req.body._id;

    await Team.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        res.status(304).json(err);
      } else {
        res.status(200).json(docs);
      }
    }).clone();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
module.exports = {
  createTeam,
  getTeam,
  deleteTeam,
};
