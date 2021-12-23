"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const Book_1 = require("../models/Book");
// abstract class AbstractBooksRepository implements IBooksRepository {
//     abstract createBook(data: Partial<IBook>): Promise<Partial<IBook>>;
//
//     abstract getBook(id: string): Promise<IBook>;
//
//     abstract getBooks(): Promise<IBook[]>;
//
//     abstract updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<void | IBook>;
//
//     abstract deleteBook(id: string): Promise<DeleteResult>;
// }
let BooksRepository = class BooksRepository {
    createBook(data) {
        const book = new Book_1.Book(data);
        book.save();
        return book;
    }
    getBook(id) {
        return Book_1.Book.findById(id).exec();
    }
    getBooks() {
        return Book_1.Book.find().exec();
    }
    updateBook(id, fieldsToUpdate) {
        return Book_1.Book.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
            .then((res) => {
            if (res === null) {
                return console.error('Not found');
            }
            return res;
        });
    }
    deleteBook(id) {
        return Book_1.Book.deleteOne({ _id: id }).exec();
    }
};
BooksRepository = __decorate([
    (0, inversify_1.injectable)()
], BooksRepository);
exports.BooksRepository = BooksRepository;
