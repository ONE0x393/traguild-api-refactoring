const express = require('express');
const alarmTypeController = require('../controllers/alarmTypeController');

const router = express.Router();

/**
 * 새로운 알람종류 정보 삽입
 */
router.put('/', alarmTypeController.createAlarmType);
/**
 * 모든 알람종류 정보 조회
 */
router.post('/all', alarmTypeController.getAllAlarmTypes);
/**
 * 알람종류 정보 수정
 */
router.post('/update', alarmTypeController.updateAlarmType);

module.exports = router;