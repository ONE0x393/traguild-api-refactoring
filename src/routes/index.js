const express = require('express');
const userRoutes = require('@src/routes/userRoutes');
const userInfoRoutes = require('@src/routes/userInfoRoutes');
const userRelationRoutes = require('@src/routes/userRelationRoutes');
const communityPostRoutes = require('@src/routes/communityPostRoutes');
const communityCommentRoutes = require('@src/routes/communityCommentRoutes');
const reportRoutes = require('@src/routes/reportRoutes');
const keywordRoutes = require('@src/routes/keywordRoutes');
const alarmTypeRoutes = require('@src/routes/alarmTypeRoutes');
const interestRequestRoutes = require('@src/routes/interestRequestRoutes');
const requestInfoRoutes = require('@src/routes/requestInfoRoutes');
const requestApplicantRoutes = require('@src/routes/requestApplicantRoutes');

const router = express.Router();

// router.use('/users', userRoutes);
router.use('/userInfo', userInfoRoutes);
router.use('/userRelation', userRelationRoutes);
router.use('/communityPost', communityPostRoutes);
router.use('/communityComment', communityCommentRoutes);
router.use('/report', reportRoutes);
router.use('/keyword', keywordRoutes);
router.use('/alarmType', alarmTypeRoutes);
router.use('/interestRequest', interestRequestRoutes);
router.use('/requestinfo', requestInfoRoutes);
router.use('/requestApplicant', requestApplicantRoutes);

module.exports = router;