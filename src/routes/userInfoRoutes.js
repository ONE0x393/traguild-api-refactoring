const express = require('express');
const userInfoController = require('../controllers/userInfoController');

const router = express.Router();

router.put('/', userInfoController.createUser);

router.post('/', userInfoController.getUser);

router.post('/all', userInfoController.getAllUsers);

router.post('/update', userInfoController.updateUser);

module.exports = router;