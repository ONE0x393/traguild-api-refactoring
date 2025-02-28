const express = require('express');
const userInfoRoutes = require('./00-userInfo/userInfoRoutes');
const userRelationRoutes = require('./00-userInfo/userRelationRoutes');
const communityPostRoutes = require('./02-community/communityPostRoutes');
const communityCommentRoutes = require('./02-community/communityCommentRoutes');
const reportRoutes = require('./03-myPage/reportRoutes');
const keywordRoutes = require('./03-myPage/keywordRoutes');
const alarmTypeRoutes = require('./03-myPage/alarmTypeRoutes');
const interestRequestRoutes = require('./01-request/interestRequestRoutes');
const requestInfoRoutes = require('./01-request/requestInfoRoutes');
const requestApplicantRoutes = require('./01-request/requestApplicantRoutes');
const creditHistoryRoutes = require('./03-myPage/creditHistoryRoutes');
const authRoutes = require('./auth/authRoutes');

const chatMessage = require('./04-Chat/chatMessageRoutes');
const chatRoom = require('./04-Chat/chatRoomRoutes');
const chatList = require('./04-Chat/chatListRoutes');

const router = express.Router();

router.use('/userInfo', userInfoRoutes);
router.use('/userRelation', userRelationRoutes);
router.use('/communityPost', communityPostRoutes);
router.use('/communityComment', communityCommentRoutes);
router.use('/report', reportRoutes);
router.use('/keyword', keywordRoutes);
router.use('/alarmType', alarmTypeRoutes);
router.use('/interestRequest', interestRequestRoutes);
router.use('/requestInfo', requestInfoRoutes);
router.use('/requestApplicant', requestApplicantRoutes);
router.use('/creditHistory', creditHistoryRoutes);
router.use('/auth', authRoutes);
router.use('/chatMessage', chatMessage);
router.use('/chatRoom', chatRoom);
router.use('/chatList', chatList);

module.exports = router;