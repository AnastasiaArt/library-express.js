"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(mail = "", password = "", screenName = "", id = (0, uuid_1.v4)()) {
        this.mail = mail;
        this.password = password;
        this.screenName = screenName;
        this.id = id;
        this.screenName = screenName;
        this.id = id;
        this.mail = mail;
        this.password = password;
    }
    getUserById(id) {
        return id === this.id ? this : null;
    }
}
exports.User = User;
