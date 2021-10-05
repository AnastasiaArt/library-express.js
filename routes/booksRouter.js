const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Api404Error = require('../models/errors/Api404Error');
const httpStatusCodes = require('../models/errors/httpStatusCodes');
const fileMiddleware = require('../middleware/file');

const store = {
    books: [
        new Book('title1', 'dest1', 'author1', 'filename', 'fileBook', 'fileCover'),
        new Book('title2', 'dest2', 'author2', 'filename', 'fileBook', 'fileCover'),
    ],
}

/**
 * Get all books
 * @return Array<new Book>
 */
router.get('/', (req, res) => {
    const {books} = store;
    res.json(books);
});

/**
 * Get book by id
 * @param id string
 * @return Object<new Book>
 */
router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        const err = new Api404Error('Book is not found');
        res.json(err);
    }
});

/**
 * Create new book
 * @param title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
    const {books} = store;
    const {title, desc, authors, favorite} = req.body;
    if (req.file) {
        const {path, filename} = req.file;
        const newBook = new Book(title, desc, authors, filename, "",path, favorite);
        books.push(newBook);
        res.status(httpStatusCodes.OK).json(newBook);
    }
});

/**
 * Change book by id
 * @param id string, title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...req.body
        };
        if (req.file) {
            const {path, filename} = req.file;
            books[idx].fileName = filename;
            books[idx].fileBook = path;
        }
        res.json(books[idx]);
    } else {
        const err = new Api404Error();
        res.json(err);
    }
});

/**
 * Delete book by id
 * @param id string
 * @return string
 */
router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        const err = new Api404Error();
        res.json(err);
    }
});

/**
 * Download book by id
 * @param id string
 * @return file
 */
router.get('/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const book = books.find(i => i.id === id);

    if (!!book) {
        res.download(__dirname + `/../${book.fileBook}`, `${book.fileName}`, err => {
            if (err) {
                const err = new Api404Error('Book is not found');
                res.json(err);
            }
        });
    } else {
        const err = new Api404Error('Book is not found');
        res.json(err);
    }
});

module.exports = router;