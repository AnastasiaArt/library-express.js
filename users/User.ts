import {v4 as uuid} from 'uuid'

export class User {
    constructor(public mail= "", public password="", public screenName="", public id = uuid()) {
        this.screenName = screenName;
        this.id = id;
        this.mail = mail;
        this.password = password;
    }
    getUserById(id: string | number) {
        return id === this.id ? this : null
    }
}