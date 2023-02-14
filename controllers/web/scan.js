const Scan = require('../../models/web/scan.js')

const { state } = require('../../helper')

// Create and Save a new Scan
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
        state(res, 400, 'Body can not be empty!')

        return
    }

    // Create a scan
    const scan = new Scan({
        name_original: req.body.name_original,
        name_en: req.body.name_en,
        name_alt: req.body.name_alt,
        link: req.body.link,
        image: req.body.image,
        description: req.body.description,
        censure: req.body.censure,
        complete: req.body.complete
    })

    // Save scan in the database
    Scan.create(scan, (err, data) => {
        if (err) {
            state(
                res,

                500,

                err.message || 'Some error occurred while creating the scan.'
            )
        } else {
            res.send(data)
        }
    })
}

// Retrieve all Scans from the database.
exports.findAll = (req, res) => {
    if (req.query.name) {
        Scan.findByName(req.query.name, (err, data) => {
            if (err) {
                state(
                    res,

                    500,

                    err.message ||
                        'Some error occurred while retrieving the scan.'
                )
            } else {
                res.send(data)
            }
        })
    } else {
        Scan.findAll((err, data) => {
            if (err) {
                state(
                    res,

                    500,

                    err.message ||
                        'Some error occurred while retrieving the scan.'
                )
            } else {
                res.send(data)
            }
        })
    }
}

// Find a single Scan by Id
exports.find = (req, res) => {
    Scan.find(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Scan with id ${req.params.id}.`)
            } else {
                state(
                    res,

                    500,

                    `Error retrieving Scan with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Update a Scan identified by the id in the request
exports.update = (req, res) => {
    // Validate Request

    if (!req.body) {
        state(res, 400, 'Content can not be empty!')
    }

    Scan.updateById(req.params.id, new Scan(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Scan with id ${req.params.id}.`)
            } else {
                state(
                    res,

                    500,

                    `Error retrieving Scan with id ${req.params.id}.`
                )
            }
        } else {
            res.send(data)
        }
    })
}

// Delete a Scan with the specified id in the request
exports.delete = (req, res) => {
    Scan.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                state(res, 404, `Not found Scan with id ${req.params.id}.`)
            } else {
                state(
                    res,

                    500,

                    `Error retrieving Scan with id ${req.params.id}.`
                )
            }
        } else {
            res.send({ message: `Scan was deleted successfully!` })
        }
    })
}
