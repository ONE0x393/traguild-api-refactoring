const express = require('express');
const loginController = require('../../controllers/auth/loginController');

const router = express.Router();

router.post('/', loginController.getLogin);

module.exports = router;