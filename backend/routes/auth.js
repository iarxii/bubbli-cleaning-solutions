const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// client routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// admin routes
router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);

module.exports = router;
