const express = require('express');
const requestInfoController = require('../controllers/requestInfoController');

const router = express.Router();

/**
 * 새로운 의뢰 정보 삽입
 */
router.put('/', requestInfoController.createRequestInfo);
/**
 * 의뢰 정보 조회
 */
router.post('/', requestInfoController.getRequestInfoByIdx);
/**
 * 모든 의뢰 정보 조회
 */
router.post('/all', requestInfoController.getAllRequestInfos);
/**
 * 내 의뢰를 제외한 의뢰들 조회
 */
router.post('/fetch', requestInfoController.getFetchRequestInfos);
/**
 * 내가 올린 의뢰만 조회
 */
router.post('/onlyMine', requestInfoController.getFecthApplicantOnlyMine);
/**
 * 특정 유저의 의뢰에 대한 지원자들 조회(10명씩)
 */
router.post('/getApply', requestInfoController.getFecthApplicantByUser);
/**
 * 의뢰 정보 수정
 */
router.post('/update', requestInfoController.updateRequestInfo);

//의뢰 이미지 수정
router.post('/updateImg', requestInfoController.updateRequestImg);

module.exports = router;