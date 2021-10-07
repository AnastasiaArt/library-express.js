const fs = require('fs');
const os = require('os');

function logError (error) {
    fs.appendFile("error-server.log", error + os.EOL, (err) => {if (err) throw err;});
}

function logErrorMiddleware (err, req, res, next) {
    logError(err.stack)
    next(err)
}

function returnError (err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message)
}

module.exports = {
    logErrorMiddleware,
    returnError,
}