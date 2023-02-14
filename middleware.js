const { state, infoLog } = require('./helper')

require('dotenv').config()

module.exports = function (req, res, next) {
    // log the resquested URL (only in development mod)
    infoLog(
        `Request for ${req.protocol}://${req.headers.host}${
            req.originalUrl
        } by ${req.headers.referer || req.protocol + '://' + req.headers.host}`
    )

    // authorization checking (need to be modified for uses)
    if (
        req.method !== 'GET' &&
        req.headers.authorization !== process.env.AUTH
    ) {
        state(res, 401, 'You may have authorization for this action')
        return
    }

    // execute the request
    next()
}
