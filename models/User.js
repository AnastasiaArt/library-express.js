const {v4: uuid} = require("uuid");

class User {
    constructor(mail= "",password="", screenName="", id = uuid()) {
        this.screenName = screenName;
        this.id = id;
        this.mail = mail;
        this.password = password;
    }
    getUserById(id) {
        return id === this.id ? this : null
    }
}

module.exports = User;