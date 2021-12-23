"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api401Error = void 0;
const httpStatusCodes_1 = require("../httpStatusCodes");
const BaseError_1 = require("./BaseError");
class Api401Error extends BaseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.httpStatusCodes.AUTH_FAILED, description = 'Authorization in failed.') {
        super(name, statusCode, description);
    }
}
exports.Api401Error = Api401Error;
