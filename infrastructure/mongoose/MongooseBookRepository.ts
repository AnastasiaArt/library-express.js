import {IBook} from "../../books/IBook";
import {Book} from "./Book";
import {DeleteResult} from "mongodb";
import {BooksRepository} from "../../books/BooksRepository";
import {injectable} from "inversify";

@injectable()
export class MongooseBooksRepository extends BooksRepository {
    async createBook(data: Partial<IBook>): Promise<Partial<IBook>> {
        const book = new Book(data);
        await book.save();
        return book
    }
    getBook(id: string): Promise<IBook> {
        return Book.findById(id).exec();
    }
    getBooks(): Promise<IBook[]> {
        return Book.find().exec();
    }
    updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<void | IBook> {
        return Book.findByIdAndUpdate(id, fieldsToUpdate, {new: true})
            .then((res: IBook) => {
                if (res === null) {
                    return console.error('Not found');
                }
                return res;
            });
    }
    deleteBook(id: number | string): Promise<DeleteResult> {
        return Book.deleteOne({_id: id}).exec();
    }
}