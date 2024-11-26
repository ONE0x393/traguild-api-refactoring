const express = require('express');
const userInfoController = require('../controllers/userInfoController');

const router = express.Router();

router.put('/', userInfoController.createUser);

router.post('/', userInfoController.getUser);

router.post('/all', userInfoController.getAllUsers);

router.post('/update', userInfoController.updateUser);

router.post('/updateforcredit', userInfoController.updateUserForCredit); //개별 user_credit 갱신

module.exports = router;