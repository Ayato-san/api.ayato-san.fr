const Link = require('../../models/web/link.js')
const Controller = require('../Controller')

module.exports = class LinkController extends Controller {
    /**
     * find one object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static find(req, res) {
        super.find(Link, req, res)
    }

    /**
     * find all objects into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static findAll(req, res) {
        super.findAll(Link, req, res)
    }

    /**
     * create a new object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static create(req, res) {
        super.create(Link, req, res)
    }

    /**
     * update an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static update(req, res) {
        super.update(Link, req, res)
    }

    /**
     * delete an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static delete(req, res) {
        super.delete(Link, req, res)
    }
}
