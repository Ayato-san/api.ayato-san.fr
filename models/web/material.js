const Model = require('../Model')

module.exports = class Material extends Model {
    /**
     * the table name
     */
    static #name = 'v_material'

    constructor(material) {
        super(material.id)
        this.type = material.type
        this.name = material.name
        this.description = material.description
        this.image = material.image
        this.material = material.material
    }

    /**
     * find one material into the table
     * @param {Number} id the id of the material
     * @param {Function} result the result processing function
     */
    static async find(id, result) {
        await super.find(this.#name, id, result)
    }

    /**
     * find all materials into the table
     * @param {{}} query the request query
     * @param {Function} result the result processing function
     */
    static async findAll(query, result) {
        let constraint = ''
        const keys = []
        if (query['type']) {
            constraint += super.constructConstraint(constraint, 'typeName = ?')
            keys.push(query['type'])
        }
        if (query['brand']) {
            constraint += super.constructConstraint(constraint, 'brandName LIKE ?')
            keys.push(super.likeValue(query['brand']))
        }
        if (query['name']) {
            constraint += super.constructConstraint(constraint, 'name LIKE ?')
            keys.push(super.likeValue(query['name']))
        }

        await super.findAll(this.#name, query, constraint, keys, result)
    }

    /**
     * create a new material into the table
     * @param {Material} newMaterial the material will be added
     * @param {Function} result the result processing function
     */
    static async create(newMaterial, result) {
        await super.create(this.#name, newMaterial, result)
    }

    /**
     * update an material of the table
     * @param {Number} id the id of the material
     * @param {Material} material the updated material
     * @param {Function} result the result processing function
     */
    static async update(id, material, result) {
        await super.update(this.#name, id, material, result)
    }

    /**
     * delete an material of the table
     * @param {Number} id the id of the material
     * @param {Function} result the result processing function
     */
    static async delete(id, result) {
        await super.delete(this.#name, id, result)
    }
}
