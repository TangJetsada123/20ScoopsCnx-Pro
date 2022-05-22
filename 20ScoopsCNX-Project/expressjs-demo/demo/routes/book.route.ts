import express from  'express';
import {queryName,findById,updateBooks,addBooks,deleteBooks, uploadFiles} from '../contollers/books.controller';
import { queryMethod } from '../middleware/middleware';
import uploads from '../middleware/upload.middleware';
const router = express.Router();
const prefixPath = "/books";


router.use(prefixPath,queryMethod);
// router.use(queryMethod);

// router.get(prefixPath,booksController.startPage)
router.post(prefixPath+'/uploads',uploads.array('files',3),uploadFiles);
router.post(prefixPath,addBooks);
router.put(prefixPath+'/:_id',updateBooks)
router.get(prefixPath,queryName);
router.get(prefixPath+ '/:id',findById);
router.delete(prefixPath+ '/:_id',deleteBooks);



export default router;