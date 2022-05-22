import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';




@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}
    @Get()
    async getBookAll(){
        const books = await this.bookService.findAll();
            return books;}
    

    @Get(':_id')
    async  getBookById(@Param('_id') _id: string){     
       const books = await  this.bookService.findById((_id));
       return books;}

    

}
