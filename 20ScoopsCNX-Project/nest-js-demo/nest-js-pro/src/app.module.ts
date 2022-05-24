import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './image/image.module';
@Module({
  imports: [ MongooseModule.forRoot(
    'mongodb+srv://TangJetsada:Cm620612144@cluster0.vdhr3.mongodb.net/store'
    ),BooksModule,ImageModule
    
    ],
 
})
export class AppModule {}
