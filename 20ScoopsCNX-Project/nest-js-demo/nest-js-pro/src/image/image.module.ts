import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { UploadService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { imageSchema,Image } from './image.model';
@Module({
  imports: [MongooseModule.forFeature([{name: Image.name, schema: imageSchema}]),
  MulterModule.register({
    dest: './uploads',
  }) 
],
  controllers: [ImageController],
  providers: [UploadService]
})
export class ImageModule {}
