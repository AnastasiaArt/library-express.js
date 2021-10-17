const express = require('express');
const router = express.Router();
const {Book} = require("../models");

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

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Общая информация по книге",
            book: books[idx],
        });
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