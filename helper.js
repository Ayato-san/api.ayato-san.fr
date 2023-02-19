require('dotenv').config()

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
    DEBUG: {
        name: 'DEBUG',
        color: '\x1B[35m'
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

function newState(res, responseObject) {
    res.status(responseObject.status).send({
        body: responseObject.body,
        count: responseObject.count,
        ok: responseObject.ok
    })
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
function debugLog(...data) {
    if (process.env.ENVIRONMENT === 'development') log(logtypes.DEBUG, ...data)
}
function warningLog(...data) {
    log(logtypes.WARNING, ...data)
}
function errorLog(...data) {
    log(logtypes.ERROR, ...data)
}

module.exports = {
    state,
    newState,
    successLog,
    infoLog,
    debugLog,
    warningLog,
    errorLog
}
