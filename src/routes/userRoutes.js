const express = require('express');
const userController = require('@src/controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

module.exports = router;