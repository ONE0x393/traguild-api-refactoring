const express = require('express');
const requestinfoController = require('@src/controllers/requestinfoController');

const router = express.Router();

/**
 * 새로운 사용자 정보 삽입
 */
router.put('/', requestinfoController.createRequestInfo);
/**
 * 사용자 정보 조회
 */
router.post('/', requestinfoController.getRequestInfo);
/**
 * 모든 사용자 정보 조회
 */
router.post('/all', requestinfoController.getAllRequestInfos);
/**
 * 사용자 정보 수정
 */
router.post('/update', requestinfoController.updateRequestInfo);

module.exports = router;