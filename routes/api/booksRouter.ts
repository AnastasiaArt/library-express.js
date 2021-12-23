import express from 'express';
export const router = express.Router();
import {Book} from '../../infrastructure/mongoose/Book';
import {Api404Error} from '../../models/errors/Api404Error';
import {httpStatusCodes} from '../../models/httpStatusCodes';
import {fileMiddleware} from '../../middleware/file';

/**
 * Get all books
 * @return Array<new Book>
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.json(books);
    } catch (e) {
        console.error(e)
        res.status(500).json(e);
    }
});

/**
 * Get book by id
 * @param id string
 * @return Object<new Book>
 */
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch(e) {
        const err = new Api404Error('Book is not found');
        res.json(err);
    }
});

/**
 * Create new book
 * @param title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
router.post('/', fileMiddleware.single('fileBook'), async (req, res) => {
    const {title, desc, authors} = req.body;
    let newBook;
    if (req.file) {
        const {path, filename} = req.file;
       newBook = new Book({title, description: desc, authors, fileName: filename, fileBook: path});
    } else {
        newBook = new Book({title, description: desc, authors})
    }
    try {
        await newBook.save();
        res.status(httpStatusCodes.OK).json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

/**
 * Change book by id
 * @param id string, title, desc, authors string, fileBook multiform/data file
 * @return Object<new Book>
 */
router.put('/:id', fileMiddleware.single('fileBook'), async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        if (req.file) {
            const {path, filename} = req.file;
            book = {...req.body, fileName: filename, fileBook: path};
        } else {
            book = {...req.body}
        }
        const newBook = await Book.findByIdAndUpdate(id, book);
        res.json(newBook);
    } catch (e) {
        const err = new Api404Error();
        res.json(err);
    }
});

/**
 * Delete book by id
 * @param id string
 * @return string
 */
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
        res.json('ok');
    } catch {
        const err = new Api404Error();
        res.json(err);
    }
});

/**
 * Download book by id
 * @param id string
 * @return file
 */
router.get('/:id/download', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id)
            res.download(__dirname + `/../${book.fileBook}`, `${book.fileName}`, err => {
                if (err) {
                    const err = new Api404Error('Book is not found');
                    res.json(err);
                }
            });
    } catch {
        const err = new Api404Error('Book is not found');
        res.json(err);
    }
});

export const booksApiRouter = router