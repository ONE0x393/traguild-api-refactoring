const express = require('express');
const chatMessageController = require('../../controllers/04-Chat/chatMessageController');

const router = express.Router();

/**
 * 새로운 채팅 생성
 */
router.put('/', chatMessageController.createChatMessage);
/**
 * 특정 사용자의 채팅 조회
 */
router.post('/', chatMessageController.getChatMessageByIdx);
/**
 * 모든 채팅 조회
 */
router.post('/all', chatMessageController.getAllChatMessages);
/**
 * 특정 채팅방의 채팅 조회
 */
router.post('/room', chatMessageController.getChatMessageByRoom);
/**
 * 채팅 수정
 */
router.post('/update', chatMessageController.updateChatMessage);


module.exports = router;