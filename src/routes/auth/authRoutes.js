const express = require('express');
const authMiddleware = require('../../middlewares/auth/auth.middle');
const authController = require('../../controllers/auth/authController');

const router = express.Router();

router.put('/signUp', [authMiddleware.checkValidID], authController.siginUpProc);
router.post('/signIn', authController.signInProc);
// router.post('/signOut', authController.signOutProc);

router.post('/reset', authController.passwordReset);

module.exports = router;