const express = require('express');
const userRoutes = require('@src/routes/userRoutes');
const userInfoRoutes = require('@src/routes/userInfoRoutes');

const router = express.Router();

// router.use('/users', userRoutes);
router.use('/userInfo', userInfoRoutes);

module.exports = router;