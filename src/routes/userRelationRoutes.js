const express = require('express');
const userRelationController = require('@src/controllers/userRelationController');

const router = express.Router();

/**
 * 새로운 사용자 관계 생성
 */
router.put('/', userRelationController.createUserRelation);
/**
 * 사용자 관계 조회
 */
router.post('/', userRelationController.getUserRelations);
/**
 * 사용자 관계 삭제
 */
router.delete('/delete', userRelationController.deleteUserRelations);

module.exports = router;