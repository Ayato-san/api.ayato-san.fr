require('dotenv').config()
const fs = require('fs')

// the 4 types of log, with their color code
const logtypes = {
    SUCCESS: {
        name: 'SUCCESS',
        color: '\x1b[32m'
    },
    INFO: {
        name: 'INFO',
        color: '\x1b[36m'
    },
    WARNING: {
        name: 'WARNING',
        color: '\x1b[33m'
    },
    ERROR: {
        name: 'ERROR',
        color: '\x1b[31m'
    }
}

// send the error state and log it on development mod
function state(res, code, message) {
    res.status(code).send({ message: message })
    if (process.env.ENVIRONMENT === 'development')
        errorLog(`${code} : "${message}"`)
}

function log(logType, ...data) {
    const date = new Date()
    const len = 7
    const message = [
        '[',
        date.toLocaleTimeString('fr-fr'),
        ']',
        logType.name.padEnd(len),
        ':',
        ...data
    ]

    if (process.env.ENVIRONMENT === 'development') {
        console.log(logType.color, ...message, '\x1b[0m')
    }
}

function successLog(...data) {
    log(logtypes.SUCCESS, ...data)
}
function infoLog(...data) {
    if (process.env.ENVIRONMENT === 'development') log(logtypes.INFO, ...data)
}
function warningLog(...data) {
    log(logtypes.WARNING, ...data)
}
function errorLog(...data) {
    log(logtypes.ERROR, ...data)
}

module.exports = { state, successLog, infoLog, warningLog, errorLog }
