"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const customers_route_1 = __importDefault(require("./routes/customers.route"));
const bodyParser = require("body-parser");
const connectDB_1 = require("./connectDB/connectDB");
dotenv_1.default.config();
(0, connectDB_1.connectDatabase)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(book_route_1.default);
app.use(customers_route_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
