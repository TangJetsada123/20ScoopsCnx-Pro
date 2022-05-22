import { Injectable, Query } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';

import {Books}  from './books.model'

@Injectable()
export class BooksService {
   constructor(@InjectModel('Books') private readonly BooksModel: Model<Books>){}
   
   async findAll(){
        const books = await this.BooksModel.find().exec();
        return books as Books[];
     }  
     
   async findById(_id: string){
        const books = await  this.BooksModel.findById(_id).exec();
        return books;
     } 

   async findByName(@Query('name') name: string){
      
   }
     

}
