const Link = require('../../models/web/link.js')

const { state } = require('../../helper')

// Create and Save a new Link
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        state(res, 400, 'Body can not be empty!')
        return
    }

    // Create a link
    const link = new Link({
        name: req.body.name,
        pseudo: req.body.pseudo,
        link: req.body.link
    })

    // Save link in the database
    Link.create(link, (err, data) => {
        if (err) {
            state(
                res,
                500,
                err.message || 'Some error occurred while creating the link.'
            )
        } else {
            res.send(data)
        }
    })
}

// Retrieve all Links from the database.
exports.findAll = (req, res) => {
    if (req.query.name) {
        Link.findByName(req.query.name, (err, data) => {
            if (err) {
                state(res, 404, err.message || 'Not found Link.')
            } else {
                res.send(data)
            }
        })
    } else {
        Link.findAll((err, data) => {
            if (err) {
                state(
                    res,
                    500,
                    err.message ||
                        'Some error occurred while retrieving the link.'
                )
            } else {
                res.send(data)
            }
        })
    }
}

// Find a single Link by Id

exports.find = (req, res) => {
    Link.find(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Link with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Link with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Update a Link identified by the id in the request
exports.update = (req, res) => {
    // Validate Request

    if (!req.body) {
        state(res, 400, 'Content can not be empty!')
    }

    Link.updateById(req.params.id, new Link(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Link with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Link with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Delete a Link with the specified id in the request
exports.delete = (req, res) => {
    Link.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Link with id ${req.params.id}.`)
            } else {
                state(
                    res,
                    500,
                    `Error retrieving Link with id ${req.params.id}.`
                )
            }
        } else {
            res.send({ message: `Link was deleted successfully!` })
        }
    })
}
