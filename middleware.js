require('dotenv').config()
const { state, requestLog } = require('./helper')
const Response = require('./models/Response')

module.exports = function (req, res, next) {
    // log the resquested URL (only in development mod)
    requestLog(`Request for ${req.protocol}://${req.headers.host}${req.originalUrl}`)

    // authorization checking (need to be modified for uses)
    if (req.headers.authorization !== `Bearer ${process.env.AUTH}`) {
        state(res, new Response(401, { message: 'You may have authorization for this action' }))
        return
    }

    // execute the request
    next()
}
