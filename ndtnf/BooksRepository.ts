import {IBook} from "./Book";
import Book from '../models/Book';
import { DeleteResult } from 'mongodb';

export class BooksRepository {
    createBook (book: IBook): IBook {
        return book
    }

    getBook( id: string): Promise<IBook> {
        return Book.findById(id).exec();
    }

    getBooks(): Promise<IBook[]> {
        return  Book.find().exec();
    }

    updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<IBook> {
        return Book.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
            .then((res) => {
                if (res === null) {
                    return console.error('Not found');
                }
                return res;
            });
    }

    deleteBook(id: string): Promise<DeleteResult> {
        return Book.deleteOne({ _id: id }).exec();
    }
}