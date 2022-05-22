import * as mongoose from 'mongoose';


export const bookSchema = new mongoose.Schema({
   name: String,
   id: String,
   genre: String   
});



export interface Books{
    
    name: string;
    id: string;
    genre: string;

}