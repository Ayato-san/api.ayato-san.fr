const User = require('../../models/twitch/user.js')
const Controller = require('../Controller')

module.exports = class UserController extends Controller {
    static find(req, res) {
        super.find(User, req, res)
    }

    static findAll(req, res) {
        super.findAll(User, req, res)
    }

    static create(req, res) {
        super.create(User, req, res)
    }

    static update(req, res) {
        super.update(User, req, res)
    }

    static delete(req, res) {
        super.delete(User, req, res)
    }
}
