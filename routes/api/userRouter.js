const express = require('express');
const router = express.Router();
const {User, Book} = require('../../models');
const httpStatusCodes = require('../../models/httpStatusCodes.js');
const {Api401Error} = require('../../models/errors');

const store = {
    books: [
        new Book('title1', 'dest1', 'author1', 'filename', 'fileBook', 'fileCover'),
        new Book('title2', 'dest2', 'author2', 'filename', 'fileBook', 'fileCover'),
    ],
}

/**
 *  User login
 */
router.post('/login', (req, res) => {
    const {users} = store;
    const {mail, password} = req.body;

    if (!mail || !password) {
        const error = new Api401Error('Username or password was left empty. Please complete both fields and re-submit.');
        res.json(error);
        return;
    }
    const user = users.find(i => i.mail === mail && i.password === password);
    if (!user) {
        const error = new Api401Error('Authorization failed');
        res.json(error);
        return;
    }
    delete user.id;
    delete user.password;
    res.status(httpStatusCodes.OK).json(user);
});

module.exports = router;