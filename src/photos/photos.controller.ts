import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotosService } from './photos.service';
import { Photo } from './interfaces/photo.interface';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  filterPhotosByUserID(@Request() req): Promise<Photo[]> {
      return this.photosService.filterPhotosByUserID(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findPhotoById(@Param('id') id): Promise<Photo[]> {
      return this.photosService.findPhotoById(id);
  }
}
