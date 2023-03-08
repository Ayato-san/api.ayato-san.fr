const Material = require('../../models/web/material.js')
const Controller = require('../Controller')

module.exports = class MaterialController extends Controller {
    /**
     * find one object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static find(req, res) {
        super.find(Material, req, res)
    }

    /**
     * find all objects into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static findAll(req, res) {
        super.findAll(Material, req, res)
    }

    /**
     * create a new object into the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static create(req, res) {
        super.create(Material, req, res)
    }

    /**
     * update an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static update(req, res) {
        super.update(Material, req, res)
    }

    /**
     * delete an object of the table
     * @param {Request} req the server request
     * @param {Response} res the server response
     */
    static delete(req, res) {
        super.delete(Material, req, res)
    }
}
