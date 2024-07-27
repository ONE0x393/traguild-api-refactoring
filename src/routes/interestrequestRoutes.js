const express = require('express');
const interestrequestController = require('@src/controllers/interestrequestController');

const router = express.Router();

/**
 * 새로운 관심의뢰 정보 삽입
 */
router.put('/', interestrequestController.createInterestRequest);
/**
 * 모든 관심의뢰 정보 조회
 */
router.post('/all', interestrequestController.getAllInterestRequests);
/**
 * 관심의뢰 정보 수정
 */
router.post('/update', interestrequestController.updateInterestRequest);

module.exports = router;