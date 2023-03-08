const Scan = require('../../models/web/scan.js')
const Controller = require('../Controller')

module.exports = class ScanController extends Controller {
    /**
     * find one object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static find(req, res) {
        super.find(Scan, req, res)
    }

    /**
     * find all objects into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static findAll(req, res) {
        super.findAll(Scan, req, res)
    }

    /**
     * create a new object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static create(req, res) {
        super.create(Scan, req, res)
    }

    /**
     * update an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static update(req, res) {
        super.update(Scan, req, res)
    }

    /**
     * delete an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static delete(req, res) {
        super.delete(Scan, req, res)
    }
}
