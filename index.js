// подключение express
const express = require("express");
const { logErrorMiddleware, returnError } = require('./middleware/errorHandler');
const userRouter = require('./routes/userRouter');
const booksRouter = require('./routes/booksRouter');
const BaseError = require('./models/errors/BaseError');
const httpStatusCodes = require('./models/errors/httpStatusCodes');
const Api401Error = require('./models/errors/Api401Error');

// создаем объект приложения
const app = express();
app.use(express.json());

// директория для статики
app.use('/public', express.static(__dirname+"/public"));

app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

// middleware обработки ошибки
app.use(logErrorMiddleware)
app.use(returnError)

app.listen(3000);