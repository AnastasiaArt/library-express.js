import {Schema, model, Document, SchemaTypes} from 'mongoose';
import {IBook} from "../../books/IBook";
const bookSchema = new Schema(
    {
            title: SchemaTypes.String,
            description: SchemaTypes.String,
            authors: SchemaTypes.String,
            favorite: SchemaTypes.String,
            fileCover: SchemaTypes.String,
            fileName: SchemaTypes.String,
            fileBook: SchemaTypes.String,
    }
);
export const Book = model<Document & IBook>('Book', bookSchema);