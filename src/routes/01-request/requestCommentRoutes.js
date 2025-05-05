const express = require('express');
const requestCommentController = require('../../controllers/01-request/requestCommentController');

const router = express.Router();

/**
 * 새로운 의뢰글 댓글 삽입
 */
router.put('/', requestCommentController.createRequestComment);
/**
 * 모든 의뢰글 댓글 정보 조회
 */
router.post('/all', requestCommentController.getAllRequestComments);
/**
 * 특정 의뢰글 댓글 조회
 */
router.post('/', requestCommentController.getRequestCommentsByIDX);
/**
 * 의뢰글 댓글 수정
 */
router.post('/update', requestCommentController.updateRequestComment);
/**
 * 의뢰글 댓글 삭제
 */
router.delete('/delete', requestCommentController.deleteRequestComment);


module.exports = router;