"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = exports.fileFilter = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books');
    }, filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const allowedTypes = ['text/txt', 'text/plain'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.fileMiddleware = (0, multer_1.default)({
    storage: exports.storage,
    fileFilter: exports.fileFilter
});
