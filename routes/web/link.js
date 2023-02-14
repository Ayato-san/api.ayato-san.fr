const links = require('../../controllers/web/link.js')

var router = require('express').Router()

// Create a new Link
router.post('/', links.create)

// Retrieve all Links
router.get('/', links.findAll)

// Retrieve a single Link with id
router.get('/:id', links.find)

// Update a Link with id
router.put('/:id', links.update)

// Delete a Link with id
router.delete('/:id', links.delete)

module.exports = router
