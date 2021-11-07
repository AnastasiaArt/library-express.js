// подключение express
const express = require("express");
const bodyParser = require("body-parser");
const { logErrorMiddleware, returnError } = require('./middleware/errorHandler');
const error404 = require('./middleware/404Error');
const userApiRouter = require('./routes/api/userRouter');
const booksApiRouter = require('./routes/api/booksRouter');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const mongoose = require('mongoose');

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
const UserDB = process.env.DB_USERNAME;
const PasswordDB = process.env.DB_PASSWORD;
const NameDB = process.env.DB_NAME
const HostDb = process.env.DB_HOST

// подключение mongoose
async function start() {
    try {
        //const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
        //const UrlDB = `mongodb://localhost:27017/mydb`;
        //const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;
        //await mongoose.connect(UrlDb);

        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();