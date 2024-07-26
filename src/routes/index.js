const express = require('express');
const userRoutes = require('@src/routes/userRoutes');
const userInfoRoutes = require('@src/routes/userinfoRoutes');
const keywordRoutes = require('@src/routes/keywordRoutes');
const AlarmtypeRoutes = require('@src/routes/alarmtypeRoutes');
const interestrequestRoutes = require('@src/routes/interestrequestRoutes');
const requestinfoRoutes = require('@src/routes/requestinfoRoutes');
const requestapplicantRoutes = require('@src/routes/requestapplicantRoutes');

const router = express.Router();

// router.use('/users', userRoutes);
router.use('/userInfo', userInfoRoutes);
router.use('/keyWord', keywordRoutes);
router.use('/alarmType', AlarmtypeRoutes);
router.use('/interestrequest', interestrequestRoutes);
router.use('/requestinfo', requestinfoRoutes);
router.use('/requestapplicant', requestapplicantRoutes);

module.exports = router;