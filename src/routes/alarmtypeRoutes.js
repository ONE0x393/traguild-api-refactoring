const express = require('express');
const alarmtypeController = require('@src/controllers/alarmtypeController');

const router = express.Router();

/**
 * 새로운 알람종류 정보 삽입
 */
router.put('/', alarmtypeController.createAlarmType);
/**
 * 모든 알람종류 정보 조회
 */
router.post('/all', alarmtypeController.getAllAlarmTypes);
/**
 * 알람종류 정보 수정
 */
router.post('/update', alarmtypeController.updateAlarmType);

module.exports = router;