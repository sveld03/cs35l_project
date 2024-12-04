// TO DO: add routes to link to callback controller functions

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, registerUsers, getAccount, updateAccount, sendThankYouEmail, verifyEmail } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/registerAll', registerUsers);
router.post('/login', loginUser);
router.post('/verifyUser', verifyToken);
router.post('verifyEmail', verifyEmail)
router.post('/getAccount', getAccount);
router.post('/updateAccount', updateAccount);

// Route to send the thank-you email
router.post('/send-thank-you-email', async (req, res) => {
    const { email } = req.body;
    try {
        await sendThankYouEmail(email);
        res.status(200).json({ message: 'Email sent' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;