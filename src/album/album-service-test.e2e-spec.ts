import { Test, TestingModule } from '@nestjs/testing';
import { AlbumDocument } from '../schemas/album.schema';
import { AlbumService } from './album.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AlbumService', () => {
    let service: AlbumService
    let model: Model<AlbumDocument>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
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
                },
            ],
        }).compile();
        service = module.get<AlbumService>(AlbumService);
        model = module.get<Model<AlbumDocument>>(getModelToken('albums'));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find album by id', async () => {
        const found = [{
            user_id: 1,
            album_id: 1,
            title: 'test'
        }];



        jest.spyOn(model, 'find').mockResolvedValue(found as AlbumDocument[]);

        service.findAlbumById(1).then((value) => {
            expect(value.length).toEqual(1);

            var first = value[0]
            expect(first.user_id).toBe(1);
            expect(first.album_id).toBe(1);
            expect(first.title).toBe('test');
        });
    });

    it('should find user albums', async () => {
        const found = [{
            user_id: 1,
            album_id: 1,
            title: 'test'
        }, {
            user_id: 1,
            album_id: 2,
            title: 'test 2'
        }];

        jest.spyOn(model, 'find').mockResolvedValue(found as AlbumDocument[]);

        service.filterAlbumsByUserId(1).then((value) => {
            expect(value.length).toEqual(2)

            var first = value[0]
            expect(first.user_id).toBe(1);
            expect(first.album_id).toBe(1);
            expect(first.title).toBe('test');

            var second = value[1]
            expect(second.user_id).toBe(1);
            expect(second.album_id).toBe(2);
            expect(second.title).toBe('test 2');
        });
    });
});