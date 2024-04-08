"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database/database");
class User {
    static getUsers() {
        return database_1.database.getUsers();
    }
}
exports.default = User;
