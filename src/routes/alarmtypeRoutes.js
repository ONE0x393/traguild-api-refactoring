const express = require('express');
const alarmtypeController = require('@src/controllers/alarmtypeController');

const router = express.Router();

/**
 * 새로운 사용자 정보 삽입
 */
router.put('/', alarmtypeController.createAlarmType);
/**
 * 모든 사용자 정보 조회
 */
router.post('/all', alarmtypeController.getAllAlarmTypes);
/**
 * 사용자 정보 수정
 */
router.post('/update', alarmtypeController.updateAlarmType);

module.exports = router;