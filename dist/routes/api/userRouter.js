"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApiRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = require("../../models/User");
const httpStatusCodes_js_1 = require("../../models/httpStatusCodes.js");
const Api401Error_1 = require("../../models/errors/Api401Error");
const store = {
    users: [
        new User_1.User('test1@mail.ru', 'test1', 'test1'),
        new User_1.User('test2@mail.ru', 'test2', 'test2'),
    ],
};
/**
 *  User login
 */
router.post('/login', (req, res) => {
    const { users } = store;
    const { mail, password } = req.body;
    if (!mail || !password) {
        const error = new Api401Error_1.Api401Error('Username or password was left empty. Please complete both fields and re-submit.');
        res.json(error);
        return;
    }
    const user = users.find(i => i.mail === mail && i.password === password);
    if (!user) {
        const error = new Api401Error_1.Api401Error('Authorization failed');
        res.json(error);
        return;
    }
    delete user.id;
    delete user.password;
    res.status(httpStatusCodes_js_1.httpStatusCodes.OK).json(user);
});
exports.userApiRouter = router;
