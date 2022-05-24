import {  Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res, UploadedFile,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/books.dto';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {editFileName,imageFileFilter} from '../middleware/middleware'

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService){}
    
    @Post()
    async create(@Body() createBookDto: CreateBookDto){
        await this.bookService.create(createBookDto)
    }

    @Get('filter')
    async getTask(@Query() createBookDto:CreateBookDto){
        
      if(createBookDto){
          return this.bookService.findByName(createBookDto);
       }else{
           const books = await this.bookService.findAll();
           return  books;
       }
    }

    @Get(':_id')
    async  getBookById(@Param('_id') _id: string){     
       const books = await  this.bookService.findById((_id));
       return books;}
    

    @Delete(':_id')
    async delete(@Param('_id') id:string){
        return this.bookService.delete(id);
    }
    
    @Post('upload')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      const books = this.bookService.create(files);
      return books;
    }

  }
