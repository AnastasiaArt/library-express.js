"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// подключение express
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
const _404Error_1 = __importDefault(require("./middleware/404Error"));
const userRouter_1 = require("./routes/api/userRouter");
const booksRouter_1 = require("./routes/api/booksRouter");
const routes_1 = require("./routes");
const books_1 = require("./routes/books");
const mongoose_1 = __importDefault(require("mongoose"));
// создаем объект приложения
const app = (0, express_1.default)();
app.use(express_1.default.json());
// директория для статики
app.use('/public', express_1.default.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/', routes_1.indexRouter);
app.use('/books', books_1.booksRouter);
app.use('/api/books', booksRouter_1.booksApiRouter);
app.use('/api/user', userRouter_1.userApiRouter);
// middleware обработки ошибки
app.use(errorHandler_1.logErrorMiddleware);
app.use(errorHandler_1.returnError);
app.use(_404Error_1.default);
const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME;
const PasswordDB = process.env.DB_PASSWORD;
const NameDB = process.env.DB_NAME;
const HostDb = process.env.DB_HOST;
// подключение mongoose
async function start() {
    try {
        //const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
        //const UrlDB = `mongodb://localhost:27017/mydb`;
        //const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;
        //await mongoose.connect(UrlDb);
        // @ts-ignore
        await mongoose_1.default.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}
start();
