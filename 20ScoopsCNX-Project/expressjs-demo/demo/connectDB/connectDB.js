"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = function () {
    mongoose_1.default.connect('mongodb+srv://TangJetsada:Cm620612144@cluster0.vdhr3.mongodb.net/store');
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("Connected success");
    });
};
exports.connectDatabase = connectDatabase;
exports.default = exports.connectDatabase;
