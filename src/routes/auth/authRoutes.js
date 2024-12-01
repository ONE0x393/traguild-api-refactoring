const express = require('express');
const authMiddleware = require('../../middlewares/auth/auth.middle');
const loginController = require('../../controllers/auth/authController');

const router = express.Router();

router.put('/signUp', [authMiddleware.checkValidID], loginController.siginUpProc);
router.post('/signIn', loginController.signInProc);
// router.post('/signOut', loginController.signOutProc);

module.exports = router;