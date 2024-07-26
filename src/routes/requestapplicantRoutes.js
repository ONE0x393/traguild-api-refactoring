const express = require('express');
const requestapplicantController = require('@src/controllers/requestapplicantController');

const router = express.Router();

/**
 * 새로운 사용자 정보 삽입
 */
router.put('/', requestapplicantController.createRequestApplicant);
/**
 * 모든 사용자 정보 조회
 */
router.post('/all', requestapplicantController.getAllRequestApplicants);
/**
 * 사용자 정보 수정
 */
router.post('/update', requestapplicantController.updateRequestApplicant);

module.exports = router;