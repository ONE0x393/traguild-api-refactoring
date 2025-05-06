const express = require('express');
const paymentsController = require('../../controllers/pg/paymentsController');

const router = express.Router();

router.post('/confirm', paymentsController.paymentsConfirm);

module.exports = router;