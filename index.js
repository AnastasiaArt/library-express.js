// подключение express
const express = require("express");
const {v4:uuid} =require("uuid");

class Book {
    constructor(title= "", desc= "", authors= "", fileName= "", fileCover = "" , favorite = true,id=uuid()) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}
class User {
    constructor(mail= "",password="", screenName="", id = uuid()) {
        this.screenName = screenName;
        this.id = id;
        this.mail = mail;
        this.password = password;
    }
}
 const stor = {
    books : [
        new Book('title1', 'dest1', 'author1', 'filename', 'fileCover'),
        new Book('title2', 'dest2', 'author2', 'filename', 'fileCover'),
    ],
     users : [
         new User('test1@gmail.com', '123', 'test1'),
         new User('test2@gmail.com', '1234', 'test2'),
     ]
 }
// создаем объект приложения
const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    const {users} = stor;
    const {mail, password} = req.body;

    if (!mail || !password) {
        res.status(401).json('Username or password was left empty. Please complete both fields and re-submit.');
        return;
    }
    const user = users.find(i => i.mail === mail && i.password === password);
    if (!user) {
        res.status(401).json('Authorization in failed.');
        return;
    }
        res.status(201).json(user);
});

app.get('/api/books/', (req, res) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404).json("book  not found");
    }
});

app.post('/api/books/', (req, res) => {
    const {books} = stor;
    const {title, desc, authors, fileName, fileCover, favorite} = req.body;
    const newBook = new Book(title, desc, authors, fileName, fileCover, favorite);
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...req.body
        };
        res.json(books[idx]);
    } else {
        res.status(404).json("book not found");
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404).json("book  not found");
    }
});

app.listen(3000);