import {Container} from "inversify";
import { BooksRepository} from "../books/BooksRepository";
import {MongooseBooksRepository} from "./mongoose/MongooseBookRepository";

export const ioc_container = new Container();

ioc_container.bind(BooksRepository).to(MongooseBooksRepository).inSingletonScope();
