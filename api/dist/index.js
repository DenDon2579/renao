"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./src/models/User"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send(User_1.default.getUsers());
});
app.listen(3001);
