const { query } = require('./db.js')
const { debugLog } = require('../helper')

const Response = require('./Response')

const DEFAULT_QUERY = ['limit', 'offset']

module.exports = class Model {
    #id

    constructor(id) {
        this.#id = id
    }
    get id() {
        return this.#id
    }
    set id(id) {
        this.#id = id
    }

    static async find(name, id, result) {
        let rows = null
        try {
            rows = await query(`SELECT * FROM ${name} WHERE id = ?`, id)
        } catch (err) {
            result(new Response(500, { message: err | 'Something went wrong' }))
            return
        }

        if (rows.length != 1) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, rows[0], rows.length))
        }
    }

    static async findAll(name, queryItems, queryList, result) {
        let rows = null
        const values = []
        let str = `SELECT * FROM ${name}`
        let endStr = ''
        if (queryItems.limit) {
            endStr += ` LIMIT ${queryItems.limit}`
            if (queryItems.offset) {
                endStr = endStr.replace('LIMIT', `LIMIT ${queryItems.offset},`)
            }
        }
        queryItems = Object.entries(queryItems).filter(arr => {
            return !DEFAULT_QUERY.includes(arr[0]) && queryList.includes(arr[0])
        })
        queryItems.forEach((element, index) => {
            str += ` ${index === 0 ? 'WHERE' : 'AND'} ${element[0]} LIKE ?`
            values.push('%' + element[1] + '%')
        })
        str += endStr
        try {
            rows = await query(str, values)
        } catch (err) {
            result(new Response(500, { message: err | 'Something went wrong' }))
            return
        }

        if (rows.length < 1) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, rows, rows.length))
        }
    }

    static async create(name, newModel, result) {
        let rows = null
        try {
            rows = await query(`INSERT INTO ${name} SET ?`, newModel)
        } catch (err) {
            result(new Response(500, { message: err | 'Something went wrong' }))
            return
        }
        newModel.id = rows.insertId
        result(new Response(201, { id: rows.insertId, ...newModel }, 1))
    }

    static async update(name, id, object, result) {
        let str = `UPDATE ${name} SET`
        Object.keys(object).forEach(token => {
            str += ` ${token} = ?,`
        })
        str = str.substring(0, str.length - 1) + ' WHERE id = ?'

        let rows = null
        try {
            rows = await query(str, [...Object.values(object), id])
        } catch (err) {
            result(new Response(500, { message: err | 'Something went wrong' }))
            return
        }

        if (rows.affectedRows == 0) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, { id, ...object }, rows.length))
        }
    }

    static async delete(name, id, result) {
        let rows = null
        try {
            rows = await query(`DELETE FROM ${name} WHERE id = ?`, id)
        } catch (err) {
            result(new Response(500, { message: err | 'Something went wrong' }))
            return
        }

        if (rows.affectedRows == 0) {
            result(new Response(404, { message: 'Not Found' }))
        } else {
            result(new Response(200, { message: 'Successfully deleted' }, 1))
        }
    }
}
