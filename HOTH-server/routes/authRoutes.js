// TO DO: add routes to link to callback controller functions

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { registerUser, loginUser, verifyToken, registerUsers, sendThankYouEmail } = require('../controllers/authController');
=======
const { registerUser, loginUser, verifyToken, registerUsers, getAccount, updateAccount } = require('../controllers/authController');
>>>>>>> 302ceb9f5ad27ca61d8d014e2de766a6fbef814e

// Auth routes
router.post('/register', registerUser);
router.post('/registerAll', registerUsers);
router.post('/login', loginUser);
router.post('/verifyUser', verifyToken);
router.post('/getAccount', getAccount);
router.post('/updateAccount', updateAccount);

// Route to send the thank-you email
router.post('/send-thank-you-email', sendThankYouEmail)

module.exports = router;