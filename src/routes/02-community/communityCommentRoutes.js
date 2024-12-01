const express = require('express');
const communityCommentController = require('../../controllers/02-community/communityCommentController');

const router = express.Router();

/**
 * 새로운 댓글 정보 삽입
 */
router.put('/', communityCommentController.createCommunityComment);
/**
 * 게시글에 대한 모든 댓글 조회
 */
router.post('/byPost', communityCommentController.getCommunityCommentsByPost);
/**
 * 사용자에 대한 모든 댓글 조회
 */
router.post('/byUser', communityCommentController.getCommunityCommentsByUser);
/**
 * 특정 댓글 수정
 */
router.post('/update', communityCommentController.updateCommunityPost);

module.exports = router;