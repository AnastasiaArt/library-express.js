"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksApiRouter = exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const Book_1 = require("../../models/Book");
const Api404Error_1 = require("../../models/errors/Api404Error");
const httpStatusCodes_1 = require("../../models/httpStatusCodes");
const file_1 = require("../../middleware/file");
/**
 * Get all books
 * @return Array<new Book>
 */
exports.router.get('/', async (req, res) => {
    try {
        const books = await Book_1.Book.find().select('-__v');
        res.json(books);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});
/**
 * Get book by id
 * @param id string
 * @return Object<new Book>
 */
exports.router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book_1.Book.findById(id).select('-__v');
        res.json(book);
    }
    catch (e) {
        const err = new Api404Error_1.Api404Error('Book is not found');
        res.json(err);
    }
});
/**
 * Create new book
 * @param title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
exports.router.post('/', file_1.fileMiddleware.single('fileBook'), async (req, res) => {
    const { title, desc, authors } = req.body;
    let newBook;
    if (req.file) {
        const { path, filename } = req.file;
        newBook = new Book_1.Book({ title, description: desc, authors, fileName: filename, fileBook: path });
    }
    else {
        newBook = new Book_1.Book({ title, description: desc, authors });
    }
    try {
        await newBook.save();
        res.status(httpStatusCodes_1.httpStatusCodes.OK).json(newBook);
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});
/**
 * Change book by id
 * @param id string, title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
exports.router.put('/:id', file_1.fileMiddleware.single('fileBook'), async (req, res) => {
    const { id } = req.params;
    let book;
    try {
        if (req.file) {
            const { path, filename } = req.file;
            book = { ...req.body, fileName: filename, fileBook: path };
        }
        else {
            book = { ...req.body };
        }
        const newBook = await Book_1.Book.findByIdAndUpdate(id, book);
        res.json(newBook);
    }
    catch (e) {
        const err = new Api404Error_1.Api404Error();
        res.json(err);
    }
});
/**
 * Delete book by id
 * @param id string
 * @return string
 */
exports.router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book_1.Book.deleteOne({ _id: id });
        res.json('ok');
    }
    catch {
        const err = new Api404Error_1.Api404Error();
        res.json(err);
    }
});
/**
 * Download book by id
 * @param id string
 * @return file
 */
exports.router.get('/:id/download', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book_1.Book.findById(id);
        res.download(__dirname + `/../${book.fileBook}`, `${book.fileName}`, err => {
            if (err) {
                const err = new Api404Error_1.Api404Error('Book is not found');
                res.json(err);
            }
        });
    }
    catch {
        const err = new Api404Error_1.Api404Error('Book is not found');
        res.json(err);
    }
});
exports.booksApiRouter = exports.router;
