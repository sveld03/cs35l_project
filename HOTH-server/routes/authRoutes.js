// TO DO: add routes to link to callback controller functions

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, registerUsers, sendThankYouEmail } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/registerAll', registerUsers);
router.post('/login', loginUser);
router.post('/verifyUser', verifyToken);

// Route to send the thank-you email
router.post('/send-thank-you-email', sendThankYouEmail)

module.exports = router;