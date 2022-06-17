const User = require("../models/UserDetails.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;
const JWT_SECRET = process.env.JWT_SECRET;

async function create(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Password incorrect");

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  login,
};
