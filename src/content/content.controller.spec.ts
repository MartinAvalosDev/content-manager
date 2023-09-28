import { Role } from '../auth/dtos/signup.dto';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(() => {
    contentService = new ContentService(null);
    contentController = new ContentController(contentService);
  });

  describe('getAllFilms', () => {
    it('should return an array of contents', async () => {
      let result;
      jest
        .spyOn(contentService, 'findContents')
        .mockImplementation(() => result);

      const response = await contentController.getAllFilms({
        user: { role: Role.USER },
      });
      expect(response).toBe(result);
    });
  });

  describe('getFilmById', () => {
    it('should return an object of content', async () => {
      let result;
      jest
        .spyOn(contentService, 'findContentById')
        .mockImplementation(() => result);
      const episode_id = 1;
      const response = await contentController.getFilmById(episode_id, {
        user: { role: Role.USER },
      });
      expect(response).toBe(result);
    });
  });
  describe('deleteContent', () => {
    it('should return an object of content', async () => {
      let result;
      jest
        .spyOn(contentService, 'deleteContent')
        .mockImplementation(() => result);
      const episode_id = 1;
      const response = await contentController.deleteContent(episode_id, {
        user: { role: Role.USER },
      });
      expect(response).toBe(result);
    });
  });

  describe('createNewContent', () => {
    it('should return an object of content', async () => {
      let result;
      let content;
      jest
        .spyOn(contentService, 'createContent')
        .mockImplementation(() => result);
      const mockContent = {
        title: 'Pelicula Prueba',
        episode_id: 12,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: ['https://swapi.dev/api/people/1/'],
        planets: ['https://swapi.dev/api/planets/1/'],
        starships: ['https://swapi.dev/api/starships/2/'],
        vehicles: ['vehiculo 1'],
        species: ['https://swapi.dev/api/species/1/'],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
        user: {
          role: Role.ADMIN,
          email: 'martinavalos@hotmail.com',
          password: 'H0la1234',
        },
      };
      const response = await contentController.createNewContent(content, {
        user: { role: Role.ADMIN },
      });
      expect(response).toBe(result);
    });
  });

  describe('updateContent', () => {
    it('should return an object of content', async () => {
      let result;
      let content;
      const episode_id = 1;
      const mockContent = {
        title: 'Pelicula Prueba',
        episode_id: 12,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: ['https://swapi.dev/api/people/1/'],
        planets: ['https://swapi.dev/api/planets/1/'],
        starships: ['https://swapi.dev/api/starships/2/'],
        vehicles: ['vehiculo 1'],
        species: ['https://swapi.dev/api/species/1/'],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
        user: {
          role: Role.ADMIN,
          email: 'martinavalos@hotmail.com',
          password: 'H0la1234',
        },
      };
      jest
        .spyOn(contentService, 'updateContent')
        .mockImplementation(() => result);
      const response = await contentController.updateContent(
        episode_id,
        content,
        { user: { role: Role.ADMIN } },
      );
      expect(response).toBe(result);
    });
  });
});
