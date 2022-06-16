const User = require('../models/UserDetails.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;
const JWT_SECRET = process.env.JWT_SECRET;

const signJWTToken = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
		},
		JWT_SECRET,
		{ expiresIn: '8h' }
	);

	return token;
};

async function create(req, res) {
<<<<<<< HEAD
	try {
		const { firstName, lastName, email, password } = req.body;
		// if (!userName || !password || !firstName || !lastName || !email || !phone)
		//   return res.status(400).json("empty field");
		// console.log(User.find({ email: email }));
		// if (User.find({ email: email }))
		//   return res.status(400).json({ message: "username already exsist" });
=======
  try {
    const { firstName, lastName, email, password } = req.body;
    // if (!userName || !password || !firstName || !lastName || !email || !phone)
    //   return res.status(400).json("empty field");
    // if (User.find({ email: email }))
    //   return res.status(400).json({ message: "username already exsist" });
>>>>>>> 6475cff75b0fb6c804549a0d9ea53dafe6886ce7

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await User.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
		});

		const tokenInfo = { id: user.id };
		const token = signJWTToken(tokenInfo);
		res.status(200).json({ authToken: token });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}

async function getUser(req, res) {
	try {
		const user = await User.find({ _id: req.body.id });

		const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
		res.status(200).json(token);
	} catch {
		res.status(400).json('Bad Credentials');
	}
}

async function login(req, res) {
	try {
		const user = await User.findOne({ name: req.body.name });

		if (!(await bcrypt.compare(req.body.password, user.password)))
			throw new Error('Password incorrect');

		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
		res.status(200).json(token);
	} catch (err) {
		res.status(400).json(err);
	}
}

module.exports = {
	create,
	login,
	getUser,
};
