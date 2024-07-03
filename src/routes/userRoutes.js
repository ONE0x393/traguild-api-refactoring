const express = require('express');
const userController = require('@src/controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/getIndex', userController.getIndexUsers);

module.exports = router;