"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const DatabaseHandler_1 = __importDefault(require("./DatabaseHandler"));
const PostreProvider_1 = __importDefault(require("./providers/postgre/PostreProvider"));
exports.database = new DatabaseHandler_1.default(new PostreProvider_1.default('www.wewe'));
