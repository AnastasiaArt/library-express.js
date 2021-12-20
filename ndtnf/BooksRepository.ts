import {IBook} from "./IBook";
import {DeleteResult} from 'mongodb';
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

interface IBooksRepository {
    createBook(data: Partial<IBook>): Promise<Partial<IBook>>;

    getBook(id: string): Promise<IBook>;

    getBooks(): Promise<IBook[]>;

    updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<IBook>;

    deleteBook(id: string): Promise<DeleteResult>;
}

abstract class AbstractBooksRepository implements IBooksRepository {
    abstract createBook(data: Partial<IBook>): Promise<Partial<IBook>>;

    abstract getBook(id: string): Promise<IBook>;

    abstract getBooks(): Promise<IBook[]>;

    abstract updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<IBook>;

    abstract deleteBook(id: string): Promise<DeleteResult>;
}

@injectable()
export class BooksRepository extends AbstractBooksRepository {
    constructor() {
        super();
    }

    createBook(data: Partial<IBook>): Promise<Partial<IBook>> {
        const book = new Book(data);
        book.save();
        return book
    }
    getBook(id: string): Promise<IBook> {
        return Book.findById(id).exec();
    }
    getBooks(): Promise<IBook[]> {
        return Book.find().exec();
    }
    updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<IBook> {
        return Book.findByIdAndUpdate(id, fieldsToUpdate, {new: true})
            .then((res: IBook) => {
                if (res === null) {
                    return console.error('Not found');
                }
                return res;
            });
    }
    deleteBook(id: string): Promise<DeleteResult> {
        return Book.deleteOne({_id: id}).exec();
    }
}