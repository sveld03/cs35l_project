// TO DO: add routes to link to callback controller functions

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
