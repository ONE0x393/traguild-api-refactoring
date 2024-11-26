const express = require('express');
const requestApplicantController = require('../controllers/requestApplicantController');

const router = express.Router();

/**
 * 새로운 의뢰지원자 정보 삽입
 */
router.put('/', requestApplicantController.createRequestApplicant);
/**
 * 모든 의뢰지원자 정보 조회
 */
router.post('/all', requestApplicantController.getAllRequestApplicants);
/**
 * 특정 사용자가 지원한 의뢰 정보 조회
 */
router.post('/applyRequest', requestApplicantController.getFetchRequestInfosByUser);
/**
 * 의뢰지원자 정보 수정
 */
router.post('/update', requestApplicantController.updateRequestApplicant);
/**
 * 모든 의뢰지원자 일괄 반려
 */
router.post('/rejectAll', requestApplicantController.updateRequestAllApplicantForReject);

module.exports = router;