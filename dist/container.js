"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const BooksRepository_1 = require("./ndtnf/BooksRepository");
exports.container = new inversify_1.Container();
exports.container.bind(BooksRepository_1.BooksRepository).toSelf().inSingletonScope();
