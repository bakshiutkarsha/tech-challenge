import { mock, verify, instance, anyString, anyNumber, when } from 'ts-mockito';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';


describe('Album Controller(using ts-mockito)', () => {
    let controller: AlbumController;
    const mockedAlbumService: AlbumService = mock(AlbumService);
    beforeEach(async () => {
        controller = new AlbumController(instance(mockedAlbumService));
    });

    it('should get albums by id', async () => {
        const found = [{
            user_id: 1,
            album_id: 1,
            title: 'test'
        }];

        when(mockedAlbumService.findAlbumById(anyNumber()),).thenReturn(Promise.resolve(found));

        const result = await controller.findAlbumById(1);

        expect(result.length).toEqual(1);
        expect(result[0].title).toBe('test');
        verify(mockedAlbumService.findAlbumById(anyNumber()),).once();
    });

    it('should get albums by user id', async () => {
        const found = [{
            user_id: 1,
            album_id: 1,
            title: 'test'
        }, {
            user_id: 1,
            album_id: 2,
            title: 'test 2'
        }];

        when(mockedAlbumService.filterAlbumsByUserId(anyNumber()),).thenReturn(Promise.resolve(found));

        const result = await controller.filterAlbumsByUserId({
            user: {
                userId: 1
            }
        });

        expect(result.length).toEqual(2);
        expect(result[0].title).toBe('test');
        expect(result[1].title).toBe('test 2');
        verify(mockedAlbumService.filterAlbumsByUserId(anyNumber()),).once();
    });
});