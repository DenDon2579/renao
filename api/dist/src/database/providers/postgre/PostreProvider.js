"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgreProvider {
    constructor(connectURL) {
        this.database = 'DATABASE';
    }
    getUsers() {
        return 'USERS FROM POSTGRE';
    }
}
exports.default = PostgreProvider;
