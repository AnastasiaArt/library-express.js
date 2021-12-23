"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api404Error = void 0;
const httpStatusCodes_1 = require("../httpStatusCodes");
const BaseError_1 = require("./BaseError");
class Api404Error extends BaseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.httpStatusCodes.NOT_FOUND, description = 'Not found.') {
        super(name, statusCode, description);
    }
}
exports.Api404Error = Api404Error;
