const Material = require('../../models/web/material.js')

const { state } = require('../../helper')

// Create and Save a new Material
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
        state(res, 400, 'Body can not be empty!')

        return
    }

    // Create a material

    const material = new Material({
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link
    })

    // Save material in the database

    Material.create(material, (err, data) => {
        if (err) {
            state(
                res,
                500,
                err.message ||
                    'Some error occurred while creating the material.'
            )
        } else {
            res.send(data)
        }
    })
}

// Retrieve all Materials from the database.
exports.findAll = (req, res) => {
    Material.findAll((err, data) => {
        if (err) {
            state(
                res,
                500,
                err.message ||
                    'Some error occurred while retrieving the material.'
            )
        } else {
            res.send(data)
        }
    })
}

// Find a single Material by Id
exports.find = (req, res) => {
    Material.find(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Material with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Material with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Update a Material identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        state(res, 400, 'Content can not be empty!')
    }

    Material.updateById(req.params.id, new Material(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Material with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Material with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Delete a Material with the specified id in the request
exports.delete = (req, res) => {
    Material.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Material with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Material with id ${req.params.id}.`
                )
            }
        } else {
            res.send({ message: `Material was deleted successfully!` })
        }
    })
}
