const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api404Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
    ) {
        super(name, statusCode, description)
    }
}

module.exports = Api404Error