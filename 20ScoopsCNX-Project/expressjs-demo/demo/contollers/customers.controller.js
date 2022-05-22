"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNameById = exports.showInfo = exports.loginAccount = exports.registerAccount = void 0;
const customers_model_1 = __importDefault(require("../models/customers.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Input is required");
        }
        const redundantUser = yield customers_model_1.default.findOne({ email });
        if (redundantUser) {
            return res.status(409).send("User already exist.");
        }
        let encryptedPassword = "";
        encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield customers_model_1.default.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword
        });
        //create Token 
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h"
        });
        user.token = token;
        return res.status(201).json(user);
    }
    catch (err) {
        return res.send(err.message);
    }
});
exports.registerAccount = registerAccount;
const loginAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!(email && password)) {
            res.status(400).send("Input is required");
        }
        const users = yield customers_model_1.default.findOne({ email });
        if (users && (yield bcryptjs_1.default.compare(password, users.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: users._id, email }, process.env.TOKEN_KEY, {
                expiresIn: "2h"
            });
            users.token = token;
            res.status(200).json(users);
        }
        else {
            return res.status(400).send("Wrong Input");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.loginAccount = loginAccount;
const showInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield customers_model_1.default.find();
        res.json(user);
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.showInfo = showInfo;
const findNameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("Your Id is" + id);
        let findId = yield customers_model_1.default.findOne({ _id: id });
        res.json(findId);
    }
    catch (err) {
        return res.send(err.message);
    }
});
exports.findNameById = findNameById;
