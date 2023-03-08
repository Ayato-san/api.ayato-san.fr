const { query } = require('./db.js')

const Response = require('./Response')

function isNumberString(str) {
    return str && !Number.isNaN(Number.parseInt(str))
}

function stringAbove(str, min) {
    return isNumberString(str) && Number.parseInt(str) > min
}

module.exports = class Model {
    static DEFAULT_QUERY = ['limit', 'offset', 'order']

    /**
     * the id in database
     */
    #id

    /**
     * @param {Number} id the id in database
     */
    constructor(id) {
        this.#id = Number.parseInt(id)
    }
    get id() {
        return this.#id
    }
    set id(id) {
        this.#id = Number.parseInt(id)
    }

    /**
     * construct added constraint to the request
     * @param {String} base base contraint
     * @param {String} added added constraint
     * @returns a contruct string with clean tag and the added constraint
     */
    static constructConstraint(base, added) {
        return ` ${/WHERE/g.test(base) ? 'AND' : 'WHERE'} ${added}`
    }

    /**
     * construct added order to the request
     * @param {String} base base contraint
     * @param {String} added added order
     * @returns a contruct string with clean tag and the added order
     */
    static constructOrder(base, added) {
        return `${/ORDER BY/g.test(base) ? ',' : ' ORDER BY'} ${added}`
    }

    /**
     * prepare string to like constraint
     * @param {String} toPrepare the string to be prepared
     * @returns prepared string
     */
    static likeValue(toPrepare) {
        return '%' + toPrepare + '%'
    }

    /**
     * find one object into the table
     * @param {String} name the table name
     * @param {Number} id the id of the object
     * @param {Function} result the result processing function
     */
    static async find(name, id, result) {
        let rows = null
        try {
            rows = await query(`SELECT * FROM ${name} WHERE id = ?`, id)
        } catch (err) {
            result(new Response(500, { message: err || 'Something went wrong' }))
            return
        }

        if (rows.length != 1) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, rows[0], rows.length))
        }
    }

    /**
     * find all objects into the table
     * @param {String} name the table name
     * @param {{}} queryItems the request query
     * @param {[String]} queryList the list of different added query
     * @param {Function} result the result processing function
     */
    static async findAll(name, passedQuery, constraint, values, result) {
        // generate the query dynamicly with the request
        let str = `SELECT * FROM ${name}${constraint}`

        // select the default queries items
        const defaultKeys = {}
        for (const key of Object.entries(passedQuery)) {
            if (!this.DEFAULT_QUERY.includes(key[0])) {
                continue
            }
            defaultKeys[key[0]] = key[1]
        }

        // order the response
        if (defaultKeys.order) {
            for (const order of defaultKeys.order.split(';')) {
                str += this.constructOrder(str, order.split(':').join(' '))
            }
        }

        // generate the limit and offset component
        if (stringAbove(defaultKeys.limit, 0)) {
            str += ` LIMIT ${defaultKeys.limit}`
            if (stringAbove(defaultKeys.offset, 0)) {
                str = str.replace('LIMIT', `LIMIT ${defaultKeys.offset},`)
            }
        }

        // Execute the query
        let rows = null
        try {
            rows = await query(str, values)
        } catch (err) {
            result(new Response(500, { message: err || 'Something went wrong' }))
            return
        }

        if (rows.length < 1) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, rows, rows.length))
        }
    }

    /**
     * create a new object into the table
     * @param {String} name the table name
     * @param {Model} newModel the object will be added
     * @param {Function} result the result processing function
     */
    static async create(name, newModel, result) {
        let rows = null
        try {
            rows = await query(`INSERT INTO ${name} SET ?`, newModel)
        } catch (err) {
            result(new Response(500, { message: err || 'Something went wrong' }))
            return
        }
        newModel.id = rows.insertId
        result(new Response(201, { id: rows.insertId, ...newModel }, 1))
    }

    /**
     * update an object of the table
     * @param {String} name the table name
     * @param {Number} id the id of the object
     * @param {Model} object the updated object
     * @param {Function} result the result processing function
     */
    static async update(name, id, object, result) {
        // generate the query dynamicly with the extends Objects
        let str = `UPDATE ${name} SET`
        Object.keys(object).forEach((token) => {
            str += ` ${token} = ?,`
        })
        str = str.substring(0, str.length - 1) + ' WHERE id = ?'

        // Execute the query
        let rows = null
        try {
            rows = await query(str, [...Object.values(object), id])
        } catch (err) {
            result(new Response(500, { message: err || 'Something went wrong' }))
            return
        }

        if (rows.affectedRows == 0) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, { id, ...object }, rows.length))
        }
    }

    /**
     * delete an object of the table
     * @param {String} name the table name
     * @param {Number} id the id of the object
     * @param {Function} result the result processing function
     */
    static async delete(name, id, result) {
        let rows = null
        try {
            rows = await query(`DELETE FROM ${name} WHERE id = ?`, id)
        } catch (err) {
            result(new Response(500, { message: err || 'Something went wrong' }))
            return
        }

        if (rows.affectedRows == 0) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, { message: 'Successfully deleted' }, 1))
        }
    }
}
