"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseHandler {
    constructor(provider) {
        this.provider = provider;
    }
    getUsers() {
        return this.provider.getUsers();
    }
}
exports.default = DatabaseHandler;
