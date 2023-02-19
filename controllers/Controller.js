const { newState } = require('../helper')
const Response = require('../models/Response')

module.exports = class Controller {
    static find(Object, req, res) {
        Object.find(req.params.id, response => {
            newState(res, response)
        })
    }

    static findAll(Object, req, res) {
        Object.findAll(req.query, response => {
            newState(res, response)
        })
    }

    static create(Object, req, res) {
        // Validate request
        if (!req.body) {
            newState(
                res,
                new Response(400, { message: 'Body can not be empty!' })
            )
            return
        }

        // Create a user
        const newObject = new Object(req.body)

        // Save user in the database
        Object.create(newObject, response => {
            newState(res, response)
        })
    }

    static update(Object, req, res) {
        // Validate Request
        if (!req.body) {
            newState(
                res,
                new Response(400, { message: 'Body can not be empty!' })
            )
            return
        }

        Object.update(req.params.id, new Object(req.body), response => {
            newState(res, response)
        })
    }

    static delete(Object, req, res) {
        Object.delete(req.params.id, response => {
            newState(res, response)
        })
    }
}
