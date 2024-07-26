const express = require('express');
const keywordController = require('@src/controllers/keywordController');

const router = express.Router();

/**
 * 새로운 사용자 정보 삽입
 */
router.put('/', keywordController.createKeyword);
/**
 * 모든 사용자 정보 조회
 */
router.post('/all', keywordController.getAllKeywords);
/**
 * 사용자 정보 수정
 */
router.post('/update', keywordController.updateKeyword);

module.exports = router;