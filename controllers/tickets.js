const Ticket = require("../models/Ticket.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

async function createTicket(req, res) {
  const {
    title,
    description,
    asignee,
    reporter,
    priority,
    type,
    status,
    dueDate,
    comments,
  } = req.body;

  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
module.exports = {
  createTicket,
};
