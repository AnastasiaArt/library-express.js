// подключение express
import express from "express";
import bodyParser from 'body-parser';
import { logErrorMiddleware, returnError } from './middleware/errorHandler';
import error404 from './middleware/404Error';
import {userApiRouter} from './routes/api/userRouter';
import { booksApiRouter } from './routes/api/booksRouter';
import {indexRouter} from './routes';
import {booksRouter} from './routes/books';
import {startMongo} from "./infrastructure/mongoose/mongo_connection";

// создаем объект приложения
const app = express();
app.use(express.json());

// директория для статики
app.use('/public', express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

// middleware обработки ошибки
app.use(logErrorMiddleware)
app.use(returnError)
app.use(error404)

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
    try {
        // подключение mongoose
        await startMongo();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();