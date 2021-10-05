const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api401Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.AUTH_FAILED,
        description = 'Authorization in failed.',
    ) {
        super(name, statusCode, description)
    }
}

module.exports = Api401Error;