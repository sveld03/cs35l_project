// TO DO: add routes to link to callback controller functions

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, registerUsers, getAccount, updateAccount } = require('../controllers/authController');

// Auth routes
router.post('/register', registerUser);
router.post('/registerAll', registerUsers);
router.post('/login', loginUser);
router.post('/verifyUser', verifyToken);
router.post('/getAccount', getAccount);
router.post('/updateAccount', updateAccount);



module.exports = router;