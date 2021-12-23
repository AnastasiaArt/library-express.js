"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    res.render("error/404", {
        title: "404 | страница не найдена",
    });
};
