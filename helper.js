require('dotenv').config()

// the 5 types of log, with their color code
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

/**
 * make and send the server response
 * @param {Response} res response object will be send by server
 * @param {*} data the custom response object this response data formated
 */
function newState(res, data) {
    res.status(data.status).send({
        body: data.body,
        count: data.count,
        ok: data.ok
    })
}

/**
 * format datas and log them
 * @param {logtypes} type the symbolic type of the log
 * @param  {...any} data the data will be logged
 */
function log(type, ...data) {
    const date = new Date()
    const len = 7
    const message = [
        '[',
        date.toLocaleTimeString('fr-fr'),
        ']',
        type.name.padEnd(len),
        ':',
        ...data
    ]
    // log just in development environment
    if (process.env.ENVIRONMENT === 'development') {
        console.log(type.color, ...message, '\x1b[0m')
    }
}

/**
 * A succes log
 * @param  {...any} data the data will be logged
 */
function successLog(...data) {
    log(logtypes.SUCCESS, ...data)
}
/**
 * An information log
 * @param  {...any} data the data will be logged
 */
function infoLog(...data) {
    log(logtypes.INFO, ...data)
}
/**
 * A debug log
 * @param  {...any} data the data will be logged
 */
function debugLog(...data) {
    log(logtypes.DEBUG, ...data)
}
/**
 * A warning log
 * @param  {...any} data the data will be logged
 */
function warningLog(...data) {
    log(logtypes.WARNING, ...data)
}
/**
 * An error log
 * @param  {...any} data the data will be logged
 */
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
