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

async function editEmployee(req, res) {
  try {
    console.log("test");
    const { id, firstName, lastName, email, role, team } = req.body;
    console.log(id);

    await Employee.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        team: team,
      },
      function (err, result) {
        if (err) {
          res.status(304).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    ).clone();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteEmployee(req, res) {
  try {
    const id = req.body.id;
    console.log(id);

    await Employee.findByIdAndDelete(id, function (err, docs) {
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
  create,
  getEmployees,
  editEmployee,
  deleteEmployee,
};
