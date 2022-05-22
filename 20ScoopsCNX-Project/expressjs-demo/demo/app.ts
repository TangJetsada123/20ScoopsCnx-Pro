import express, { Express} from 'express';
import dotenv from 'dotenv';
import bookRouter from './routes/book.route';
import customerRouter from './routes/customers.route';
import bodyParser = require('body-parser');
import {connectDatabase} from './connectDB/connectDB'

dotenv.config();
connectDatabase();


const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bookRouter);
app.use(customerRouter);


app.listen(port, ()=>{
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

