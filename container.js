const { Container } = require("inversify");
const { BooksRepository } = require("./ndtnf/js/BooksRepository");

const container = new Container();
container.bind(BooksRepository).toSelf();

module.exports = container;