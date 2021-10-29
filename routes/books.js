const express = require('express');
const router = express.Router();
const {Book} = require("../models");
const axios = require('axios').default;
const {handleAxiosError, handleUnexpectedError}=require('axios');
const COUNTER_API_URL = `http://${process.env.COUNTER_URL || 'localhost'}:${process.env.COUNTER_PORT || '8080'}/counter`;
const store = {
    books: [
        new Book('title1', 'dest1', 'author1', 'filename', 'fileBook', 'fileCover'),
        new Book('title2', 'dest2', 'author2', 'filename', 'fileBook', 'fileCover'),
    ],
}

router.get('/', (req, res) => {
    const {books} = store;
    res.render("books/index", {
        title: "Список книг",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = store;
    const {title, desc, authors } = req.body;
    const newBook = new Book(title, desc, authors, '', "", '', '');
    books.push(newBook);
    res.redirect('/books')
});

router.get('/:id', async (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        try {

           const {data}= await axios.post(`${COUNTER_API_URL}/1/cnt`);
            res.render("books/view", {
                title: "Общая информация по книге",
                book: books[idx],
                counter: data.counter || 0,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            }
            res.status(500).json({ error });
        }
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Редактирование книги",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const {desc, title, authors} = req.body;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            authors,
            ...{description: desc},
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;