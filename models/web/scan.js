const { query } = require('../db.js')

const { errorLog } = require('../../helper')

const Scan = function (scan) {
    this.id = scan.id

    this.name_original = scan.name_original

    this.name_en = scan.name_en

    this.name_alt = scan.name_alt

    this.link = scan.link

    this.image = scan.image

    this.description = scan.description

    this.censure = scan.censure

    this.complete = scan.complete
}

Scan.create = async (newScan, result) => {
    let row = null

    try {
        row = await query('INSERT INTO scan SET ?', newScan)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, { id: row.insertId, ...newScan })
}

Scan.find = async (id, result) => {
    let rows = null

    try {
        rows = await query('SELECT * FROM scan WHERE id = ?', id)
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

Scan.findByName = async (name, result) => {
    name = '%' + name + '%'

    let rows = null

    try {
        rows = await query(
            'SELECT * FROM scan WHERE name_original LIKE ? OR name_en LIKE ? OR name_alt LIKE ? ORDER BY name_en, name_original',

            [name, name, name]
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

Scan.findAll = async result => {
    let row = null

    try {
        row = await query('SELECT * FROM scan ORDER BY name_en, name_original')
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, row)
}

Scan.updateById = async (id, scan, result) => {
    let row = null

    try {
        row = await query(
            'UPDATE scan SET scan.name_original = ?, scan.name_en = ?, scan.name_alt = ?, scan.link = ?, scan.image = ?, scan.description = ?, scan.censure = ?, scan.complete = ? WHERE id = ?',

            [
                scan.name_original,

                scan.name_en,

                scan.name_alt,

                scan.link,

                scan.image,

                scan.description,

                scan.censure,

                scan.complete,

                id
            ]
        )
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Scan with the id

        notFound(result)

        return
    }

    result(null, { id: id, ...scan })
}

Scan.delete = async (id, result) => {
    let row = null

    try {
        row = await query('DELETE FROM scan WHERE id = ?', id)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Scan with the id

        notFound(result)

        return
    }

    result(null, res)
}

module.exports = Scan
