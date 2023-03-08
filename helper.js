require('dotenv').config()

// the 5 types of log, with their color code
const logtypes = {
    SUCCESS: { name: 'SUCCESS', color: '\x1b[32m' },
    INFO: { name: 'INFO', color: '\x1b[36m' },
    REQUEST: { name: 'REQUEST', color: '\x1b[34m' },
    DEBUG: { name: 'DEBUG', color: '\x1B[35m' },
    WARNING: { name: 'WARNING', color: '\x1b[33m' },
    ERROR: { name: 'ERROR', color: '\x1b[31m' },
}

/**
 * make and send the server response
 * @param {Response} res response object will be send by server
 * @param {*} data the custom response object this response data formated
 */
function state(res, data) {
    res.status(data.status).send({ body: data.body, count: data.count, ok: data.ok })
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
        date.toLocaleDateString('fr-fr'),
        date.toLocaleTimeString('fr-fr'),
        ']',
        type.name.padEnd(len),
        ':',
        ...data,
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
 * An request log
 * @param  {...any} data the data will be logged
 */
function requestLog(...data) {
    log(logtypes.REQUEST, ...data)
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

module.exports = { state, successLog, infoLog, requestLog, debugLog, warningLog, errorLog }
