const { newState } = require('../helper')
const Model = require('../models/Model')
const HttpResponse = require('../models/Response')

module.exports = class Controller {
    /**
     * find one object into the table
     * @param {Model} Interface the Model interface
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static find(Interface, req, res) {
        Interface.find(req.params.id, response => {
            newState(res, response)
        })
    }

    /**
     * find all objects into the table
     * @param {Model} Interface the Model interface
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static findAll(Interface, req, res) {
        Interface.findAll(req.query, response => {
            newState(res, response)
        })
    }

    /**
     * create a new object into the table
     * @param {Model} Interface the Model interface
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static create(Interface, req, res) {
        // Validate request
        if (!req.body) {
            newState(
                res,
                new HttpResponse(400, { message: 'Body can not be empty!' })
            )
            return
        }

        // Create a user
        const newInterface = new Interface(req.body)

        // Save user in the database
        Interface.create(newInterface, response => {
            newState(res, response)
        })
    }

    /**
     * update an object of the table
     * @param {Model} Interface the Model interface
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static update(Interface, req, res) {
        // Validate Request
        if (!req.body) {
            newState(
                res,
                new HttpResponse(400, { message: 'Body can not be empty!' })
            )
            return
        }

        Interface.update(req.params.id, new Interface(req.body), response => {
            newState(res, response)
        })
    }

    /**
     * delete an object of the table
     * @param {Model} Interface the Model interface
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static delete(Interface, req, res) {
        Interface.delete(req.params.id, response => {
            newState(res, response)
        })
    }
}
