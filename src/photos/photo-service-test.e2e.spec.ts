import { Test, TestingModule } from '@nestjs/testing';
import { PhotoDocument } from '../schemas/photo.schema';
import { PhotosService } from './photos.service';
import { AlbumService } from '../album/album.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mock, verify, instance, anyString, anyNumber, when } from 'ts-mockito';

describe('PhotosService', () => {
    let service: PhotosService
    const mockedAlbumService: AlbumService = mock(AlbumService);
    let model: Model<PhotoDocument>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PhotosService,
                {
                    provide: getModelToken('photos'),
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                    },
                },
                AlbumService,
                {
                    provide: getModelToken('albums'),
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                    },
                }
            ],
        }).compile();
        service = module.get<PhotosService>(PhotosService);
        model = module.get<Model<PhotoDocument>>(getModelToken('photos'));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find album by id', async () => {
        const found = [{
            album_id: 1,
            photo_id: 1,
            title: 'test',
            url: 'test',
            thumbnailUrl: 'test'
        }];

        jest.spyOn(model, 'find').mockResolvedValue(found as PhotoDocument[]);

        service.findPhotoById(1).then((value) => {
            expect(value.length).toEqual(1);

            var first = value[0]
            expect(first.album_id).toBe(1);
            expect(first.photo_id).toBe(1);
            expect(first.title).toBe('test');
            expect(first.url).toBe('test');
            expect(first.thumbnailUrl).toBe('test');
        });
    });
});