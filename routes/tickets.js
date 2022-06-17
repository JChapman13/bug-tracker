const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

//GET
router.get('/tickets', ticketsCtrl.ticketsIndex);

//POST
// router.post('');

module.exports = router;
