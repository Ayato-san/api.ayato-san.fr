const { successLog } = require('../helper')

require('dotenv').config()

// Create a connection to the database

const connection = require('mysql').createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
})

// open the MySQL connection

connection.connect(error => {
    if (error) throw error
    successLog('database connected')
})

//make the query request to a promise

const query = require('util').promisify(connection.query).bind(connection)

module.exports = { query }
