const express = require('express');
const chatListController = require('../../controllers/04-Chat/chatListController');

const router = express.Router();

/**
 * 새로운 채팅현황 생성
 */
router.put('/', chatListController.createChatList);
/**
 * 특정 사용자의 채팅현황 조회
 */
router.post('/', chatListController.getChatListByIdx);
/**
 * 모든 채팅현황 조회
 */
router.post('/all', chatListController.getAllChatLists);
/**
 * 특정 채팅방의 채팅현황 조회
 */
router.post('/room', chatListController.getChatListByRoom);
/**
 * 특정 채팅방의 채팅현황 조회
 */
router.post('/mine', chatListController.getAllChattingListByMine);
/**
 * 채팅현황 수정
 */
router.post('/update', chatListController.updateChatList);


module.exports = router;