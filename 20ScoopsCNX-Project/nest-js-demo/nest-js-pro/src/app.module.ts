import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ MongooseModule.forRoot(
    'mongodb+srv://TangJetsada:Cm620612144@cluster0.vdhr3.mongodb.net/store'
    ), 
    BooksModule]
    ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
