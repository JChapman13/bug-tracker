const express = require("express");
const router = express.Router();
const ticketsCtrl = require("../controllers/tickets");

router.post("/tickets-create", ticketsCtrl.createTicket);

module.exports = router;
