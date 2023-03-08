const Model = require('../Model')

module.exports = class Link extends Model {
    /**
     * the table name
     */
    static #name = 'link'

    constructor(link) {
        super(link.id)
        this.name = link.name
        this.pseudo = link.pseudo
        this.link = link.link
    }

    /**
     * find one link into the table
     * @param {Number} id the id of the link
     * @param {Function} result the result processing function
     */
    static async find(id, result) {
        await super.find(this.#name, id, result)
    }

    /**
     * find all links into the table
     * @param {{}} query the request query
     * @param {Function} result the result processing function
     */
    static async findAll(query, result) {
        let constraint = ''
        const keys = []
        if (query['name']) {
            constraint += super.constructConstraint(constraint, '(name = ? OR name_alt = ?)')
            keys.push(query['name'])
            keys.push(query['name'])
        }

        await super.findAll(this.#name, query, constraint, keys, result)
    }

    /**
     * create a new link into the table
     * @param {Link} newLink the link will be added
     * @param {Function} result the result processing function
     */
    static async create(newLink, result) {
        await super.create(this.#name, newLink, result)
    }

    /**
     * update an link of the table
     * @param {Number} id the id of the link
     * @param {Link} link the updated link
     * @param {Function} result the result processing function
     */
    static async update(id, link, result) {
        await super.update(this.#name, id, link, result)
    }

    /**
     * delete an link of the table
     * @param {Number} id the id of the link
     * @param {Function} result the result processing function
     */
    static async delete(id, result) {
        await super.delete(this.#name, id, result)
    }
}
