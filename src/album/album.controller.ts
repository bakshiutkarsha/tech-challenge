import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AlbumService } from './album.service';
import { Album } from './interfaces/album.interface';

@Controller('albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    filterAlbumsByUserId(@Request() req): Promise<Album[]> {
        return this.albumService.filterAlbumsByUserId(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findAlbumById(@Param('id') id): Promise<Album[]> {
        return await this.albumService.findAlbumById(id);
    }
}
