const express = require('express');
const keywordController = require('../../controllers/03-myPage/keywordController');

const router = express.Router();

/**
 * 새로운 키워드 정보 삽입
 */
router.put('/', keywordController.createKeyword);
/**
 * 모든 키워드 정보 조회
 */
router.post('/all', keywordController.getAllKeywords);
/**
 * 키워드 정보 수정
 */
router.post('/update', keywordController.updateKeyword);

module.exports = router;