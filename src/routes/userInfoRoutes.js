const express = require('express');
const userInfoController = require('../controllers/userInfoController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadDir = "/data/upload/profile";

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

router.put('/', userInfoController.createUser);

router.post('/', userInfoController.getUser);

router.post('/all', userInfoController.getAllUsers);

router.get('/userImg/:idx', userInfoController.getUserWithImg);

router.post('/update', userInfoController.updateUser);

router.post('/updateUserImg', upload.single("image"), userInfoController.updateUserImg);

router.post('/updateforcredit', userInfoController.updateUserForCredit); //개별 user_credit 갱신

module.exports = router;