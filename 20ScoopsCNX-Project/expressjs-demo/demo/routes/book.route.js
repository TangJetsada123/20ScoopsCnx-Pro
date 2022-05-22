"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../contollers/books.controller");
const middleware_1 = require("../middleware/middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = express_1.default.Router();
const prefixPath = "/books";
router.use(prefixPath, middleware_1.queryMethod);
// router.use(queryMethod);
// router.get(prefixPath,booksController.startPage)
router.post(prefixPath + '/uploads', upload_middleware_1.default.array('files', 3), books_controller_1.uploadFiles);
router.post(prefixPath, books_controller_1.addBooks);
router.put(prefixPath + '/:_id', books_controller_1.updateBooks);
router.get(prefixPath, books_controller_1.queryName);
router.get(prefixPath + '/:id', books_controller_1.findById);
router.delete(prefixPath + '/:_id', books_controller_1.deleteBooks);
exports.default = router;
