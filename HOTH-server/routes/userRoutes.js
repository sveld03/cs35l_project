const express = require('express')
const User = require('../model/user.js')

// get controllers
const {getUsers, getUser, createUser, deleteUser, updateUser} = require('../controllers/userController.js')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a specific user

router.get('/:id', getUser)

// POST a new user

router.post('/', createUser)

// DELETE a specific user

router.delete('/:id', deleteUser)

// UPDATE a specific user

router.patch('/:id', updateUser)

module.exports = router