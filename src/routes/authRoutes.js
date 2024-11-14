// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../auth/authController');

// Rute untuk register
router.post('/register', register);

// Rute untuk login
router.post('/login', login);

module.exports = router;
