import express from 'express';
import { queryName } from '../contollers/books.controller';
import {  findNameById, loginAccount, registerAccount, showInfo} from '../contollers/customers.controller';
import { authenticationToken } from '../middleware/authen.middleware';

const router = express.Router();
const Path = '/customers';

router.get(Path+"/info",showInfo)
router.get(Path+"/info/:id",findNameById);
router.post(Path+"/register",registerAccount);
router.post(Path+"/login", loginAccount);
router.post(Path+"/homepage", authenticationToken,queryName);

export default router;