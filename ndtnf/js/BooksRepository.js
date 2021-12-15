"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const { Schema, model } = require('mongoose');
const bookSchema = new Schema({
    title: String,
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String,
    fileBook: String,
});
const Book = model('Kniga', bookSchema);
let BooksRepository = class BooksRepository {
    constructor() { }
    createBook(book) {
        return book;
    }
    getBook(id) {
        return Book.findById(id).exec();
    }
    getBooks() {
        return Book.find().exec();
    }
    updateBook(id, fieldsToUpdate) {
        return Book.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
            .then((res) => {
            if (res === null) {
                return console.error('Not found');
            }
            return res;
        });
    }
    deleteBook(id) {
        return Book.deleteOne({ _id: id }).exec();
    }
};
BooksRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], BooksRepository);
exports.BooksRepository = BooksRepository;
