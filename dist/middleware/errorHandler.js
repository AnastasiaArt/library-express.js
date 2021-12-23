"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = exports.logErrorMiddleware = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
function logError(error) {
    fs_1.default.appendFile("error-server.log", error + os_1.default.EOL, (err) => { if (err)
        throw err; });
}
function logErrorMiddleware(err, req, res, next) {
    logError(err.stack);
    next(err);
}
exports.logErrorMiddleware = logErrorMiddleware;
function returnError(err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
