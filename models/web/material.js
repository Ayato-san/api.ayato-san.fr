const { query } = require('../db.js')

const { errorLog } = require('../../helper')

const Material = function (material) {
    this.id = material.id
    this.type = material.type
    this.name = material.name
    this.description = material.description
    this.image = material.image
    this.link = material.link
}

Material.create = async (newMaterial, result) => {
    let row = null

    try {
        row = await query('INSERT INTO material SET ?', newMaterial)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, { id: row.insertId, ...newMaterial })
}

Material.find = async (id, result) => {
    let rows = null

    try {
        rows = await query('SELECT * FROM v_material WHERE id = ?', id)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (rows.length) {
        result(null, rows)

        return
    }

    // not found Material with the id

    result({ kind: 'not_found' }, null)
}

Material.findAll = async result => {
    let row = null

    try {
        row = await query('SELECT * FROM v_material')
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    result(null, row)
}

Material.updateById = async (id, material, result) => {
    let row = null

    try {
        row = await query(
            'UPDATE material SET material.type = ?, material.name = ?, material.description = ?, material.image = ?, material.link = ? WHERE id = ?',

            [
                material.type,

                material.name,

                material.description,

                material.image,

                material.link,

                id
            ]
        )
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Material with the id

        notFound(result)

        return
    }

    result(null, { id: id, ...material })
}

Material.delete = async (id, result) => {
    let row = null

    try {
        row = await query('DELETE FROM material WHERE id = ?', id)
    } catch (err) {
        errorLog('error : ', err)

        result(err, null)
    }

    if (res.affectedRows == 0) {
        // not found Material with the id

        notFound(result)

        return
    }

    result(null, res)
}

module.exports = Material
