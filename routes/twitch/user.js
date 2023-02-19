const users = require('../../controllers/twitch/user.js')
var router = require('express').Router()

// Create a new User
router.post('/', users.create)

// Retrieve all Users
router.get('/', users.findAll)

// Retrieve a single User with id
router.get('/:id', users.find)

// Update a User with id
router.put('/:id', users.update)

// Delete a User with id
router.delete('/:id', users.delete)

module.exports = router