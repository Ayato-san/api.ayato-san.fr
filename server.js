const express = require('express')
const { infoLog, successLog } = require('./helper')
const fs = require('fs')
const path = require('path')
const app = express()
require('dotenv').config()
let port = process.env.PORT || 3000
app.use(require('cors')())
app.use(require('./middleware.js'))
app.use(express.json())

if (typeof PhusionPassenger !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false })
    port = 'passenger'
}

// Routes
const routesFolder = './routes'
function findRoutes(path) {
    const filenames = fs.readdirSync(path)
    const dirs = filenames.filter((elt) => {
        return fs.lstatSync(`${path}/${elt}`).isDirectory()
    })
    if (dirs.length > 0) {
        dirs.forEach((dir) => {
            findRoutes(`${path}/${dir}`)
        })
    }
    filenames
        .filter((elt) => {
            return elt.endsWith('.js')
        })
        .forEach((filename) => {
            const file = filename.split('.')[0]
            let completePath = file
            if (path.split(routesFolder + '/')[1] !== undefined) {
                completePath = `${path.split(routesFolder + '/')[1]}/${file}`
            }

            app.use(`/${completePath}`, require(`${path}/${file}`))

            successLog(`route /${completePath} created`)
        })
}
findRoutes(routesFolder)

let server = app.listen(port, function () {
    server = {
        host:
            server.address().address === '::'
                ? 'localhost'
                : server.address().address,
        port: server.address().port,
    }
    server.address = `http://${server.host}:${server.port}`
    infoLog(`Listening on : ${server.address}`)
})
