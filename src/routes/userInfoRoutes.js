const express = require('express');
const userInfoController = require('../controllers/userInfoController');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/data/upload/profile");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.put('/', userInfoController.createUser);

router.post('/', userInfoController.getUser);

router.post('/all', userInfoController.getAllUsers);

router.post('/userImg', userInfoController.getUserWithImg);

router.post('/update', userInfoController.updateUser);

router.post('/updateUserImg', upload.single("image"), userInfoController.updateUserImg);

router.post('/updateforcredit', userInfoController.updateUserForCredit); //개별 user_credit 갱신

module.exports = router;