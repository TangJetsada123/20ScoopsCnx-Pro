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
exports.uploadFiles = exports.deleteBooks = exports.updateBooks = exports.addBooks = exports.findById = exports.queryName = void 0;
const books_model_1 = __importDefault(require("../models/books.model"));
const upload_model_1 = __importDefault(require("../models/upload.model"));
//query string filter with name
const queryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.name;
    if (userName) {
        try {
            let findName = yield books_model_1.default.find({ name: { $regex: String(userName).toUpperCase().toLowerCase() } });
            res.json(findName);
        }
        catch (error) {
            return res.send(error.message);
        }
    }
    else {
        try {
            let findBook = yield books_model_1.default.find();
            res.json(findBook);
        }
        catch (error) {
            return res.send(error.message);
        }
        // let findOneBook = bookModel.find()
        // .then((book)=> res.json(book))
        // .catch((error) => {
        //     res.status(500).send({ message: error.message });
        // });
    }
});
exports.queryName = queryName;
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log("Your Id is " + id);
        let findId = yield books_model_1.default.findOne({ _id: id });
        // .then((book) => res.json(book))
        // .catch((error) => {
        //     res.status(500).send({message: error.message});
        // });
        res.json(findId);
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.findById = findById;
const addBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payLoad = req.body;
        const book = yield new books_model_1.default(payLoad);
        book.save();
        res.json(payLoad);
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.addBooks = addBooks;
//update
const updateBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params._id;
    const bookName = req.body;
    try {
        const updateBook = yield books_model_1.default.findById(bookId);
        Object.assign(updateBook, bookName);
        updateBook.save();
        res.send({ data: updateBook });
    }
    catch (_a) {
        res.status(404).send({ error: "Error" });
    }
});
exports.updateBooks = updateBooks;
//delete
const deleteBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params._id;
        console.log(bookId);
        yield books_model_1.default.deleteMany({ _id: bookId }).exec();
        res.status(204).send("Delete");
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.deleteBooks = deleteBooks;
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payLoad = req.files;
    const result = [];
    try {
        for (let i = 0; i < payLoad.length; i++) {
            let image = new upload_model_1.default(payLoad[i]);
            const images = yield image.save();
            result.push(images);
            // throw new Error("Hello");
        }
    }
    catch (err) {
        console.log(err);
        return res.send(err.message);
    }
    console.log(result);
    res.json(result);
});
exports.uploadFiles = uploadFiles;
