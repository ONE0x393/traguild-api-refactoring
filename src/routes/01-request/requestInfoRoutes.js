const express = require('express');
const requestInfoController = require('../../controllers/01-request/requestInfoController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadDir = "/data/upload/request";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);

    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

/**
 * 새로운 의뢰 정보 삽입
 */
router.put('/', upload.single("image"), requestInfoController.createRequestInfo);
/**
 * 의뢰 이미지 가져오기
 */
router.get('/getImage/:idx', requestInfoController.getRequestImage);
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
 * 특정 사용자가 자신의 의뢰중 몇개의 의뢰에 대해 수락을 하였는지 목록 조회
 */
router.post('/howManyAccept', requestInfoController.getHowManyAcceptByUser);
/**
 * 제목으로 의뢰 조회
 */
router.post('/title', requestInfoController.getFetchRequestInfosByTitle);
/**
 * 의뢰 정보 수정
 */
router.post('/update', requestInfoController.updateRequestInfo);
/**
 * 의뢰 이미지 수정
 */
router.post('/updateImg', requestInfoController.updateRequestImg);

module.exports = router;