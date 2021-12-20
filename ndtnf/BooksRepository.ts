import {IBook} from "./IBook";
import { DeleteResult } from 'mongodb';
import {injectable} from "inversify";
import "reflect-metadata";

const {Schema, model} = require('mongoose');
const bookSchema = new Schema(
    {
        title: String,
        description: String,
        authors: String,
        favorite: String,
        fileCover: String,
        fileName: String,
        fileBook: String,
    }
);
const Book = model('Kniga', bookSchema);

@injectable()
export class BooksRepository {
    constructor() {}
    public createBook (data: Partial<IBook>): Promise<Partial<IBook>> {
        const book = new Book(data);
        book.save();
        return book
    }

    public getBook( id: string): Promise<IBook> {
        return Book.findById(id).exec();
    }

    public getBooks(): Promise<IBook[]> {
        return  Book.find().exec();
    }

    public updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<IBook> {
        return Book.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
            .then((res: IBook) => {
                if (res === null) {
                    return console.error('Not found');
                }
                return res;
            });
    }

    public deleteBook(id: string): Promise<DeleteResult> {
        return Book.deleteOne({ _id: id }).exec();
    }
}