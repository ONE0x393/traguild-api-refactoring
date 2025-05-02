const express = require('express');
const reportController = require('../../controllers/03-myPage/reportController');

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
/**
 * 사용자가 특정 의뢰에 대해 신고를 했는지 확인
 */
router.post('/reportProcess', reportController.checkReportAlreadyByUser);

module.exports = router;