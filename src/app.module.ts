import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AlbumModule } from './album/album.module';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://utkarsha:rZ2fRS8KJ5ZJhbU7@musicdatabase-3ekhb.mongodb.net/NestDb'), UsersModule, PhotosModule, AlbumModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
