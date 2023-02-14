const scans = require('../../controllers/web/scan.js')

var router = require('express').Router()

// Create a new Scan
router.post('/', scans.create)

// Retrieve all Scans
router.get('/', scans.findAll)

// Retrieve a single Scan with id
router.get('/:id', scans.find)

// Update a Scan with id
router.put('/:id', scans.update)

// Delete a Scan with id
router.delete('/:id', scans.delete)

module.exports = router
