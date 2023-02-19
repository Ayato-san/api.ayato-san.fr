require('dotenv').config()
const { state, infoLog, newState, debugLog } = require('./helper')
const Response = require('./models/Response')

module.exports = function (req, res, next) {
    if (req.protocol === 'http' && process.env.ENVIRONMENT !== 'development') {
        res.redirect(301, 'https://' + req.headers.host + req.originalUrl)
    }
    // log the resquested URL (only in development mod)
    infoLog(
        `Request for ${req.protocol}://${req.headers.host}${req.originalUrl}`
    )

    // authorization checking (need to be modified for uses)
    if (req.headers.authorization !== `Bearer ${process.env.AUTH}`) {
        newState(
            res,
            new Response(401, {
                message: 'You may have authorization for this action'
            })
        )
        return
    }

    // execute the request
    next()
}
