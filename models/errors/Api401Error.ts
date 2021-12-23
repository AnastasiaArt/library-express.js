import {httpStatusCodes} from '../httpStatusCodes';
import {BaseError} from'./BaseError';

export class Api401Error extends BaseError {
    constructor (
        name: any,
        statusCode = httpStatusCodes.AUTH_FAILED,
        description = 'Authorization in failed.',
    ) {
        super(name, statusCode, description)
    }
}