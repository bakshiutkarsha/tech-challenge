import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo, PhotoSchema } from '../schemas/photo.schema';
import { AlbumModule } from '../album/album.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'photos', schema: PhotoSchema }]), AlbumModule],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
