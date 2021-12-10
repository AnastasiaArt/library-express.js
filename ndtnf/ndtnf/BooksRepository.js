"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const Book_1 = __importDefault(require("../models/Book"));
class BooksRepository {
    createBook(book) {
        return book;
    }
    getBook(id) {
        return Book_1.default.findById(id).exec();
    }
    getBooks() {
        return Book_1.default.find().exec();
    }
    updateBook(id, fieldsToUpdate) {
        return Book_1.default.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
            .then((res) => {
            if (res === null) {
                return console.error('Not found');
            }
            return res;
        });
    }
    deleteBook(id) {
        return Book_1.default.deleteOne({ _id: id }).exec();
    }
}
exports.BooksRepository = BooksRepository;
