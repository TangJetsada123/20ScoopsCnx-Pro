"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = process.env;
const authenticationToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['access-token'];
    if (!token) {
        return res.status(403).send("A token is required for Authen");
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
        req.user = decode;
    }
    catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.authenticationToken = authenticationToken;
