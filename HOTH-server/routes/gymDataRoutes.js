const express = require('express');
const router = express.Router();
const { getGymData } = require('../controllers/gymDataController');

router.get('/', getGymData);


module.exports = router;