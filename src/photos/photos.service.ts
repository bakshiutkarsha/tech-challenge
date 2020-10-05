import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo, PhotoDocument } from '../schemas/photo.schema';
import { AlbumService } from '../album/album.service';


@Injectable()
export class PhotosService {
  constructor(@InjectModel('photos') private photoModel: Model<PhotoDocument>,
              private readonly albumService: AlbumService
  ) {}

  async filterPhotosByUserID(id: number): Promise<Photo[]> {
    const albums = await this.albumService.filterAlbumsByUserId(id);
    const photoArr: Array<any> = [];
   
    for(let i = 0; i < albums.length; i++){
      const photo = await this.photoModel.find({album_id:albums[i].album_id})
      photoArr.push(photo);
    }
    return photoArr;
  }

  async findPhotoById(id: number): Promise<Photo[]> {
    return this.photoModel.find({photo_id:id})
  }
}
