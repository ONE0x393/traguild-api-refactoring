const express = require('express');
const interestRequestController = require('../../controllers/01-request/interestRequestController');

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
 * 유저와 의뢰정보로 특정 관심 조회
 */
router.post('/exactly', interestRequestController.getInterestRequestExactly);
/**
 * 모든 관심의뢰 정보 조회
 */
router.post('/fetch', interestRequestController.getFetchInterestRequestsByUser);
/**
 * 관심의뢰 정보 수정
 */
router.post('/update', interestRequestController.updateInterestRequest);
/**
 * 관심의뢰 정보 삭제
 */
router.delete('/delete', interestRequestController.deleteInterestRequest);


module.exports = router;