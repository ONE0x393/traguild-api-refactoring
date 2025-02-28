const express = require('express');
const chatRoomController = require('../../controllers/04-Chat/chatRoomController');

const router = express.Router();

/**
 * 새로운 채팅 생성
 */
router.put('/', chatRoomController.createChatRoom);
/**
 * 특정 사용자의 채팅 조회
 */
router.post('/', chatRoomController.getChatRoomByIdx);
/**
 * 모든 채팅 조회
 */
router.post('/all', chatRoomController.getAllChatRooms);
/**
 * 특정 채팅방의 채팅 조회
 */
router.post('/name', chatRoomController.getChatRoomByName);
/**
 * 채팅 수정
 */
router.post('/update', chatRoomController.updateChatRoom);


module.exports = router;