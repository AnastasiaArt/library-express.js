const express = require('express');
const router = express.Router();
// const Book = require('../models/Book');
const axios = require('axios').default;
const {handleAxiosError, handleUnexpectedError} = require('axios');
const COUNTER_API_URL = `http://${process.env.COUNTER_URL || 'localhost'}:${process.env.COUNTER_PORT || '8080'}/counter`;

const container = require("../container");
const {BooksRepository} = require("../ndtnf/js/BooksRepository");
const Book = container.get(BooksRepository);


router.get('/', async (req, res) => {
    try {
        const books = await Book.getBooks();
        res.render("books/index", {
            title: "Список книг",
            books: books,
        });
    } catch(e) {
        console.error(e)
    }
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, desc, authors } = req.body;
    try {
        await Book.createBook({title, description: desc, authors});
        res.redirect('/books')
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
        try {
           const book =await Book.getBook(id);
           const {data}= await axios.post(`${COUNTER_API_URL}/1/cnt`);
            res.render("books/view", {
                title: "Общая информация по книге",
                book: book,
                counter: data.counter || 0,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                res.status(404).redirect('/404');
            }
        }
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.getBook(id);
        res.render("books/update", {
            title: "Редактирование книги",
            book: book,
        });
    } catch {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {desc, title, authors} = req.body;
    try {
        await Book.updateBook(id, {title, authors, description: desc});
        res.redirect(`/books/${id}`);
    } catch {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteBook({_id: id});
        res.redirect(`/books`);
    } catch {
        res.status(404).redirect('/404');
    }
});

module.exports = router;