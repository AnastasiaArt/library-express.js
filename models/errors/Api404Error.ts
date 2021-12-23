import {httpStatusCodes} from '../httpStatusCodes';
import {BaseError} from'./BaseError';

export class Api404Error extends BaseError {
    constructor (
        name?: any,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
    ) {
        super(name, statusCode, description)
    }
}
