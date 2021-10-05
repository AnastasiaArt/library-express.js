const express = require('express');
const router = express.Router();
const User = require('../models/User');
const httpStatusCodes = require('../models/errors/httpStatusCodes.js');
const Api401Error = require('../models/errors/Api401Error.js');

const store = {
    users : [
        new User('test1@gmail.com', '123', 'test1'),
        new User('test2@gmail.com', '1234', 'test2'),
    ]
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