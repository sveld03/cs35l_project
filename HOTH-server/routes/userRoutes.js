const express = require('express')
const User = require('../model/user.js')

// get controllers
const {getUsers, getUser, createUser, deleteUser, updateUser, createUsers, sendThankYouEmail } = require('../controllers/userController.js')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a specific user

router.get('/:id', getUser)

// POST a new user

router.post('/createUser', createUser)

// POST many users
router.post('/createUsers', createUsers)

// DELETE a specific user

router.delete('/delete/:id', deleteUser)

// UPDATE a specific user

router.patch('/patch/:id', updateUser)

module.exports = router