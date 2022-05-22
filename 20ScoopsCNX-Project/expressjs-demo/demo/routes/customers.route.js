"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../contollers/books.controller");
const customers_controller_1 = require("../contollers/customers.controller");
const authen_middleware_1 = require("../middleware/authen.middleware");
const router = express_1.default.Router();
const Path = '/customers';
router.get(Path + "/info", customers_controller_1.showInfo);
router.get(Path + "/info/:id", customers_controller_1.findNameById);
router.post(Path + "/register", customers_controller_1.registerAccount);
router.post(Path + "/login", customers_controller_1.loginAccount);
router.post(Path + "/homepage", authen_middleware_1.authenticationToken, books_controller_1.queryName);
exports.default = router;
