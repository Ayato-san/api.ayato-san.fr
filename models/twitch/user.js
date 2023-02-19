const Model = require('../Model')

module.exports = class User extends Model {
    static #name = 'user'

    constructor(user) {
        super(user.id)
        this.pseudo = user.pseudo
        this.displayName = user.displayName
    }

    static async find(id, result) {
        await super.find(this.#name, id, result)
    }

    static async findAll(query, result) {
        await super.findAll(
            this.#name,
            query,
            ['pseudo', 'displayName'],
            result
        )
    }

    static async create(newUser, result) {
        await super.create(this.#name, newUser, result)
    }

    static async update(id, user, result) {
        await super.update(this.#name, id, user, result)
    }

    static async delete(id, result) {
        await super.delete(this.#name, id, result)
    }
}
