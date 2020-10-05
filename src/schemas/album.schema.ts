import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  user_id: number;

  @Prop()
  album_id: number;

  @Prop()
  title: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);