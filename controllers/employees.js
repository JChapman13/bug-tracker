const Employee = require("../models/Employee.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;
const JWT_SECRET = process.env.JWT_SECRET;

// async function create(req, res) {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     const user = await User.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "8h" });
//     res.status(200).json(token);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// }

// async function login(req, res) {
//   console.log(req.body);
//   try {
//     const user = await User.findOne({ name: req.body.email });

//     if (!(await bcrypt.compare(req.body.password, user.password)))
//       throw new Error("Password incorrect");

//     const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "8h" });
//     res.status(200).json(token);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

async function create(req, res) {
  try {
    const { firstName, lastName, email, role, team } = req.body;

    const employee = await Employee.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      team: team,
    });

    const token = jwt.sign({ employee }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    //   }
  }
}

async function getEmployees(req, res) {
  try {
    let employees = await Employee.find({});

    const token = jwt.sign({ employees }, JWT_SECRET, { expiresIn: "8h" });
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  create,
  getEmployees,
};
