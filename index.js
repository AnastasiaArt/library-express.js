// подключение express
const express = require("express");
const bodyParser = require("body-parser");
const { logErrorMiddleware, returnError } = require('./middleware/errorHandler');
const error404 = require('./middleware/404Error');
const userApiRouter = require('./routes/api/userRouter');
const booksApiRouter = require('./routes/api/booksRouter');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books')

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

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});