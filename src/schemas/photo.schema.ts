import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhotoDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop()
  album_id: number;

  @Prop()
  photo_id: number;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  thumbnailUrl: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);