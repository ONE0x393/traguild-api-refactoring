const express = require('express');
const requestInfoController = require('../controllers/requestInfoController');

const router = express.Router();

/**
 * 새로운 의뢰 정보 삽입
 */
router.put('/', requestInfoController.createRequestInfo);
/**
 * 의뢰 정보 조회
 */
router.post('/', requestInfoController.getRequestInfoByIdx);
/**
 * 모든 의뢰 정보 조회
 */
router.post('/all', requestInfoController.getAllRequestInfos);
/**
 * 의뢰인의 모든 지원자 조회
 */
router.post('/getApply', requestInfoController.getFecthApplicantByUser);
/**
 * 의뢰 정보 수정
 */
router.post('/update', requestInfoController.updateRequestInfo);

module.exports = router;