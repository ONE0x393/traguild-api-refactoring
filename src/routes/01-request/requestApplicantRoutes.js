const express = require('express');
const requestApplicantController = require('../../controllers/01-request/requestApplicantController');

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
 * 특정 사용자가 올린 의뢰에 지원한 사람들 정보 조회
 */
router.post('/getApply', requestApplicantController.getApplicantInfoByUser);
/**
 * 특정 사용자가 지원한 의뢰중 승인된 의뢰 목록 조회
 */
router.post('/getAccepted', requestApplicantController.getAcceptedApplicantByUser);
/**
 * 특정 사용자가 지원하여 승인된 의뢰중 완료된 의뢰 목록 조회
 */
router.post('/getFinished', requestApplicantController.getFinishedApplicantByUser);
/**
 * 의뢰지원자 정보 수정
 */
router.post('/update', requestApplicantController.updateRequestApplicant);
/**
 * 모든 의뢰지원자 일괄 반려
 */
router.post('/rejectAll', requestApplicantController.updateRequestAllApplicantForReject);

module.exports = router;