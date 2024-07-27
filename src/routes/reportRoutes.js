const express = require('express');
const reportController = require('@src/controllers/reportController');

const router = express.Router();

/**
 * 새로운 신고 정보 생성
 */
router.put('/', reportController.createReport);
/**
 * 모든 신고 정보 조회
 */
router.post('/all', reportController.getAllReports);
/**
 * 사용자에 대한 신고 정보 조회
 */
router.post('/byUser', reportController.getReportsByUser);

module.exports = router;