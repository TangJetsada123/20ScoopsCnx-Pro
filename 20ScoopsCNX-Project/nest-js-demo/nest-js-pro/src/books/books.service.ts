import { ConsoleLogger, Injectable, Query, UploadedFile } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import {Book, BookDocument}  from './books.model'
import { CreateBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
   book: any;
   constructor(@InjectModel(Book.name) private  readonly BooksModel: Model<BookDocument>) {}
   
   async create(createBookDto: CreateBookDto): Promise<Book>{
      const book = await this.BooksModel.create(createBookDto);
      return book;
   }
   async findAll(){
        const books = await this.BooksModel.find().exec();
        return books;
     }  
     
   async findById(_id: string){
        const books = await  this.BooksModel.findById(_id).exec();
        return books;
     } 

   async findByName(createBookDto: CreateBookDto){
      const books = await this.BooksModel.find(createBookDto);
      return books;
   }  

   async delete(id:string){
      const book = await this.BooksModel.findByIdAndRemove({_id: id }).exec();
      return book;
   }
   
   
   
   
}

   


  




