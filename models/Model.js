const { query } = require('./db.js')
const { debugLog } = require('../helper')

const Response = require('./Response')

const DEFAULT_QUERY = ['limit', 'offset']

function isNumberString(str) {
    return !Number.isNaN(Number.parseInt(str))
}

module.exports = class Model {
    /**
     * the id in database
     */
    #id

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
            result(
                new Response(500, { message: err || 'Something went wrong' })
            )
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
    static async findAll(name, queryItems, queryList, result) {
        // generate the query dynamicly with the request
        let str = `SELECT * FROM ${name}`

        // generate the limit and offset component
        let endStr = ''
        if (
            queryItems.limit &&
            isNumberString(queryItems.limit) &&
            Number.parseInt(queryItems.limit) > 0
        ) {
            endStr += ` LIMIT ${queryItems.limit}`
            if (
                queryItems.offset &&
                isNumberString(queryItems.offset) &&
                Number.parseInt(queryItems.offset) > 0
            ) {
                endStr = endStr.replace('LIMIT', `LIMIT ${queryItems.offset},`)
            }
        }

        // remove the default query of the query list
        queryItems = Object.entries(queryItems).filter(arr => {
            return !DEFAULT_QUERY.includes(arr[0]) && queryList.includes(arr[0])
        })

        // adding where clauses dynamicly with valid query
        const values = []
        queryItems.forEach((element, index) => {
            str += ` ${index === 0 ? 'WHERE' : 'AND'} ${element[0]} LIKE ?`
            values.push('%' + element[1] + '%')
        })
        str += endStr

        // Execute the query
        let rows = null
        try {
            rows = await query(str, values)
        } catch (err) {
            result(
                new Response(500, { message: err || 'Something went wrong' })
            )
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
            result(
                new Response(500, { message: err || 'Something went wrong' })
            )
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
        Object.keys(object).forEach(token => {
            str += ` ${token} = ?,`
        })
        str = str.substring(0, str.length - 1) + ' WHERE id = ?'

        // Execute the query
        let rows = null
        try {
            rows = await query(str, [...Object.values(object), id])
        } catch (err) {
            result(
                new Response(500, { message: err || 'Something went wrong' })
            )
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
            result(
                new Response(500, { message: err || 'Something went wrong' })
            )
            return
        }

        if (rows.affectedRows == 0) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, { message: 'Successfully deleted' }, 1))
        }
    }
}
