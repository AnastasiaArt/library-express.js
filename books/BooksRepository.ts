import {IBook} from "./IBook";
import {DeleteResult} from 'mongodb';
import "reflect-metadata";
import {injectable} from "inversify";

interface IBooksRepository {
    createBook(data: Partial<IBook>): Promise<Partial<IBook>>;
    getBook(id: string): Promise<IBook>;
    getBooks(): Promise<IBook[]>;
    updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<void | IBook>;
    deleteBook(id: string): Promise<DeleteResult>;
}

@injectable()
export abstract class BooksRepository implements IBooksRepository{
    abstract createBook(data: Partial<IBook>): Promise<Partial<IBook>>;
    abstract getBook(id: string): Promise<IBook>;
    abstract getBooks(): Promise<IBook[]>;
    abstract updateBook(id: string, fieldsToUpdate: Partial<IBook>): Promise<void | IBook>;
    abstract deleteBook(id: any): Promise<DeleteResult>;
}