import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ImageDocument = Image & Document;

@Schema()
export class Image{
    @Prop()
    fieldname: string;

    @Prop()
    originalname: string;

    @Prop()
    encoding: string;

    @Prop()
    mimtype: string;

    @Prop()
    destination: string;

    @Prop()
    filename: string;

    @Prop()
    path: string;

    @Prop()
    size: string;
}

export const imageSchema = SchemaFactory.createForClass(Image)