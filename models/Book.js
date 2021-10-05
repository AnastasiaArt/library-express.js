const {v4: uuid} = require("uuid");

class Book {
    constructor(title= "", desc= "", authors= "", fileName= "", fileCover = "" , fileBook="", favorite = true, id=uuid()) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}

module.exports = Book;