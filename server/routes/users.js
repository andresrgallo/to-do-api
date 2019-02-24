const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/users.controller');

router.post('/register', userController.create);
router.post('/login', userController.authenticate);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetpassword', userController.resetPassword);
router.post('/update', userController.update);

module.exports = router;
