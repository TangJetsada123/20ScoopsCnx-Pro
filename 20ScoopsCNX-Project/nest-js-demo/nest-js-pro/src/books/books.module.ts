import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './books.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{name: Book.name, schema: bookSchema}]),
  MulterModule.register({
    dest: './uploads',
  })],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
