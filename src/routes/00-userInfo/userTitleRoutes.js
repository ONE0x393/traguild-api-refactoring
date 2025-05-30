const express = require('express');
const userTitleController = require('../../controllers/00-userInfo/userTitleController');

const router = express.Router();

/**
 * 새로운 레벨 및 칭호 추가
 */
router.put('/', userTitleController.createUserTitle);
/**
 * 사용자 레벨에 따른 칭호 조회
 */
router.post('/', userTitleController.getUserTitles);
/**
 * 사용자 칭호 삭제
 */
router.post('/update', userTitleController.updateUserTitle);

module.exports = router;