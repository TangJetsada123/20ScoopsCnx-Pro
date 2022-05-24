import { ConsoleLogger, Injectable, Query, UploadedFile} from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Image, ImageDocument } from 'src/image/image.model';
import { CreateImageDto } from 'src/image/dto/image.dto';


@Injectable()
export class UploadService{
   image: any;
   constructor(@InjectModel(Image.name) private readonly ImageModel: Model<ImageDocument>){}

   async uploadFile(createImageDto: CreateImageDto): Promise<Image>{
      const image = await this.ImageModel.create(createImageDto);
      return image;
   }
}