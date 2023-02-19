const Model = require('../Model')

module.exports = class User extends Model {
    /**
     * the table name
     */
    static #name = 'user'

    constructor(user) {
        super(user.id)
        this.pseudo = user.pseudo
        this.displayName = user.displayName
    }

    /**
     * find one user into the table
     * @param {Number} id the id of the user
     * @param {Function} result the result processing function
     */
    static async find(id, result) {
        await super.find(this.#name, id, result)
    }

    /**
     * find all users into the table
     * @param {{}} query the request query
     * @param {Function} result the result processing function
     */
    static async findAll(query, result) {
        await super.findAll(
            this.#name,
            query,
            ['pseudo', 'displayName'],
            result
        )
    }

    /**
     * create a new user into the table
     * @param {User} newUser the user will be added
     * @param {Function} result the result processing function
     */
    static async create(newUser, result) {
        await super.create(this.#name, newUser, result)
    }

    /**
     * update an user of the table
     * @param {Number} id the id of the user
     * @param {User} user the updated user
     * @param {Function} result the result processing function
     */
    static async update(id, user, result) {
        await super.update(this.#name, id, user, result)
    }

    /**
     * delete an user of the table
     * @param {Number} id the id of the user
     * @param {Function} result the result processing function
     */
    static async delete(id, result) {
        await super.delete(this.#name, id, result)
    }
}
