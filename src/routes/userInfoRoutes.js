const express = require('express');
const userInfoController = require('@src/controllers/userInfoController');

const router = express.Router();

/**
 * 새로운 사용자 정보 삽입
 */
router.put('/', userInfoController.createUser);
/**
 * 사용자 정보 조회
 */
router.post('/', userInfoController.getUser);
/**
 * 모든 사용자 정보 조회
 */
router.post('/all', userInfoController.getAllUsers);
/**
 * 사용자 정보 수정
 */
router.post('/update', userInfoController.updateUser);

module.exports = router;