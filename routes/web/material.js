const materials = require('../../controllers/web/material.js')

var router = require('express').Router()

// Create a new Material
router.post('/', materials.create)

// Retrieve all Materials
router.get('/', materials.findAll)

// Retrieve a single Material with id
router.get('/:id', materials.find)

// Update a Material with id
router.put('/:id', materials.update)

// Delete a Material with id
router.delete('/:id', materials.delete)

module.exports = router
