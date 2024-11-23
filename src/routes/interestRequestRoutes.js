const express = require('express');
const interestRequestController = require('../controllers/interestRequestController');

const router = express.Router();

/**
 * 새로운 관심의뢰 정보 삽입
 */
router.put('/', interestRequestController.createInterestRequest);
/**
 * 모든 관심의뢰 정보 조회
 */
router.post('/all', interestRequestController.getAllInterestRequests);
/**
 * 모든 관심의뢰 정보 조회
 */
router.post('/fetch', interestRequestController.getFetchInterestRequestsByUser);
/**
 * 관심의뢰 정보 수정
 */
router.post('/update', interestRequestController.updateInterestRequest);


module.exports = router;