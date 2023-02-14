const { query } = require('../db.js')

const { errorLog } = require('../../helper')

const Link = function (link) {
    this.id = link.id
    this.name = link.name
    this.pseudo = link.pseudo
    this.link = link.link
}

Link.create = async (newLink, result) => {
    let row = null

    try {
        row = await query('INSERT INTO link SET ?', newLink)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, { id: row.insertId, ...newLink })
}

Link.find = async (id, result) => {
    let rows = null

    try {
        rows = await query('SELECT * FROM link WHERE id = ?', id)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (rows.length) {
        result(null, rows)

        return
    }

    // not found Link with the id
    result({ kind: 'not_found' }, null)
}

Link.findByName = async (name, result) => {
    let rows = null

    try {
        rows = await query(
            'SELECT * FROM link WHERE name = ? OR name_alt = ?',

            [name, name]
        )
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (rows.length) {
        result(null, rows)

        return
    }

    // not found Scan with the id
    result({ kind: 'not_found' }, null)
}

Link.findAll = async result => {
    let row = null

    try {
        row = await query('SELECT * FROM link')
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, row)
}

Link.updateById = async (id, link, result) => {
    let row = null

    try {
        row = await query(
            'UPDATE link SET link.name = ?, link.pseudo = ?, link.link = ? WHERE id = ?',

            [link.name, link.pseudo, link.link, id]
        )
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Link with the id
        notFound(result)

        return
    }

    result(null, { id: id, ...link })
}

Link.delete = async (id, result) => {
    let row = null

    try {
        row = await query('DELETE FROM link WHERE id = ?', id)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Link with the id
        notFound(result)

        return
    }

    result(null, res)
}

module.exports = Link
