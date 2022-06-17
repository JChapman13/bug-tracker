const Ticket = require('../models/Ticket.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = {
	ticketsIndex,
};

async function ticketsIndex(req, res) {
	try {
		let tickets = await Ticket.find();
		res.status(200).json(tickets);
		console.log('in ticket CTRL');
	} catch (err) {
		res.status(400).json(err);
	}
}
