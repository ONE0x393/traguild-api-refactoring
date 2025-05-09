const express = require('express');
const reportController = require('../../controllers/03-myPage/reportController');

const router = express.Router();

/**
 * 사용자가 특정 의뢰에 대해 신고를 했는지 확인하여 새로운 신고 정보 생성
 */
router.put('/', reportController.checkReportAlreadyByUser);
/**
 * 모든 신고 정보 조회
 */
router.post('/all', reportController.getAllReports);
/**
 * 사용자에 대한 신고 정보 조회
 */
router.post('/byUser', reportController.getReportsByUser);

module.exports = router;