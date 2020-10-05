import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { CreateAlbumDto } from './create-album.dto'

@Injectable()
export class AlbumService {
  constructor(@InjectModel('albums') private albumModel: Model<AlbumDocument>) {}

  async filterAlbumsByUserId(id: number): Promise<Album[]> {
    return this.albumModel.find({user_id: id});
  }

  async findAlbumById(id: number): Promise<Album[]> {
    return this.albumModel.find({album_id: id});
  }
}
