const User = require('../../models/twitch/user.js')
const Controller = require('../Controller')

module.exports = class UserController extends Controller {
    /**
     * find one object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static find(req, res) {
        super.find(User, req, res)
    }

    /**
     * find all objects into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static findAll(req, res) {
        super.findAll(User, req, res)
    }

    /**
     * create a new object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static create(req, res) {
        super.create(User, req, res)
    }

    /**
     * update an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static update(req, res) {
        super.update(User, req, res)
    }

    /**
     * delete an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static delete(req, res) {
        super.delete(User, req, res)
    }
}
