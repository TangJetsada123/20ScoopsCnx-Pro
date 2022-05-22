import express, {Express, NextFunction, Request, Response} from 'express';

const app: Express = express();


export const queryMethod = (req: express.Request, res: express.Response,next: NextFunction) =>{
    console.log(req.url,req.method);
    next();
};




export default app;