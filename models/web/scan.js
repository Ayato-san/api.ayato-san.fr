const Model = require('../Model')

module.exports = class Scan extends Model {
    /**
     * the table name
     */
    static #name = 'scan'

    constructor(scan) {
        super(scan.id)
        this.name_original = scan.name_original
        this.name_en = scan.name_en
        this.name_alt = scan.name_alt
        this.link = scan.link
        this.image = scan.image
        this.description = scan.description
        this.censure = scan.censure
        this.complete = scan.complete
    }

    /**
     * find one scan into the table
     * @param {Number} id the id of the scan
     * @param {Function} result the result processing function
     */
    static async find(id, result) {
        await super.find(this.#name, id, result)
    }

    /**
     * find all scans into the table
     * @param {{}} query the request query
     * @param {Function} result the result processing function
     */
    static async findAll(query, result) {
        let constraint = ''
        const keys = []
        if (query['name']) {
            constraint += super.constructConstraint(
                constraint,
                '(name_original LIKE ? OR name_en LIKE ? OR name_alt LIKE ?)'
            )
            keys.push(super.likeValue(query['name']))
            keys.push(super.likeValue(query['name']))
            keys.push(super.likeValue(query['name']))
        }

        await super.findAll(this.#name, query, constraint, keys, result)
    }

    /**
     * create a new scan into the table
     * @param {Scan} newScan the scan will be added
     * @param {Function} result the result processing function
     */
    static async create(newScan, result) {
        await super.create(this.#name, newScan, result)
    }

    /**
     * update an scan of the table
     * @param {Number} id the id of the scan
     * @param {Scan} scan the updated scan
     * @param {Function} result the result processing function
     */
    static async update(id, scan, result) {
        await super.update(this.#name, id, scan, result)
    }

    /**
     * delete an scan of the table
     * @param {Number} id the id of the scan
     * @param {Function} result the result processing function
     */
    static async delete(id, result) {
        await super.delete(this.#name, id, result)
    }
}
