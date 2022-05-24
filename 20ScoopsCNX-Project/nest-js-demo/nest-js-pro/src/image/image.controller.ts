import { Controller,Post } from "@nestjs/common";
import {UploadedFiles,UseInterceptors } from '@nestjs/common';
import { UploadService } from "./image.service";
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {editFileName,imageFileFilter} from '../middleware/middleware'

@Controller('image')
export class ImageController{
    
    constructor(private readonly imageService: UploadService){}
    
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
      console.log(files)
      const image = await this.imageService.uploadFile(files);
    
     return image;
    }
}