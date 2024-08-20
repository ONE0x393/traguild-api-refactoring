const express = require('express');
const communityPostController = require('../controllers/communityPostController');

const router = express.Router();

/**
 * 새로운 게시글 정보 삽입
 */
router.put('/', communityPostController.createCommunityPost);
/**
 * 사용자에 대한 모든 게시글 조회
 */
router.post('/', communityPostController.getCommunityPostsByUser);
/**
 * 모든 게시글 조회
 */
router.post('/all', communityPostController.getAllCommunityPosts);
/**
 * 특정 게시글 수정
 */
router.post('/update', communityPostController.updateCommunityPost);

module.exports = router;