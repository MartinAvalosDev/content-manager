import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { Role } from 'src/auth/dtos/signup.dto';
import { CreateContentDto } from './dtos/create-content.dto';
import { UpdateContentDto } from './dtos/update-content.dto';
import { ContentController } from './content.controller';
import { PassportModule } from '@nestjs/passport';

describe('ContentService', () => {
  let contentService: ContentService;
  let contentController: ContentController ;

  const mockContent ={
    title: "Pelicula Prueba",
    episode_id: 12,
    opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    characters: [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/3/",
      "https://swapi.dev/api/people/4/",
      "https://swapi.dev/api/people/5/",
      "https://swapi.dev/api/people/6/",
      "https://swapi.dev/api/people/7/",
      "https://swapi.dev/api/people/8/",
      "https://swapi.dev/api/people/9/",
      "https://swapi.dev/api/people/10/",
      "https://swapi.dev/api/people/12/",
      "https://swapi.dev/api/people/13/",
      "https://swapi.dev/api/people/14/",
      "https://swapi.dev/api/people/15/",
      "https://swapi.dev/api/people/16/",
      "https://swapi.dev/api/people/18/",
      "https://swapi.dev/api/people/19/",
      "https://swapi.dev/api/people/81/"
    ],
    planets: [
      "https://swapi.dev/api/planets/1/",
      "https://swapi.dev/api/planets/2/",
      "https://swapi.dev/api/planets/3/"
    ],
    starships: [
      "https://swapi.dev/api/starships/2/",
      "https://swapi.dev/api/starships/3/",
      "https://swapi.dev/api/starships/5/",
      "https://swapi.dev/api/starships/9/",
      "https://swapi.dev/api/starships/10/",
      "https://swapi.dev/api/starships/11/",
      "https://swapi.dev/api/starships/12/",
      "https://swapi.dev/api/starships/13/"
    ],
    vehicles: [
      "vehiculo 1"
    ],
    species: [
      "https://swapi.dev/api/species/1/",
      "https://swapi.dev/api/species/2/",
      "https://swapi.dev/api/species/3/",
      "https://swapi.dev/api/species/4/",
      "https://swapi.dev/api/species/5/"
    ],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    url: "https://swapi.dev/api/films/1/",
    user: {
      role: "Administrador",
      email: "djsdo@gmail.com",
      password: "hhadhada"
    }
  };

  const mockRole = "Usuario Regular";

  const mockContentService = {
    find: jest.fn(),
    findeOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ContentController],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    contentController = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
  });

  describe('findContents', () => {
    it('should get all contents', async () => {
      const role: Role = Role.USER;
      const result = await contentController.getAllFilms(role);

      expect(contentService.findContents).toHaveBeenCalled();
      expect(result).toEqual([mockContent]);
    });
  });
  
  describe('findContentById', () => {
    it('should get a content by episode_id', async () => {
      const role: Role = Role.USER;
      const result = await contentController.getFilmById(mockContent.episode_id, role);

      expect(contentService.findContentById).toHaveBeenCalled();
      expect(result).toEqual(mockContent);
    });
  });

  describe('createContent', () => {
    it('should create a new content', async () => {
      const newContent = {
        "title": "Pelicula Prueba",
        "episode_id": 12,
        "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        "director": "George Lucas",
        "producer": "Gary Kurtz, Rick McCallum",
        "release_date": "1977-05-25",
        "characters": [
          "https://swapi.dev/api/people/1/",
          "https://swapi.dev/api/people/2/",
          "https://swapi.dev/api/people/3/",
          "https://swapi.dev/api/people/4/",
          "https://swapi.dev/api/people/5/",
          "https://swapi.dev/api/people/6/",
          "https://swapi.dev/api/people/7/",
          "https://swapi.dev/api/people/8/",
          "https://swapi.dev/api/people/9/",
          "https://swapi.dev/api/people/10/",
          "https://swapi.dev/api/people/12/",
          "https://swapi.dev/api/people/13/",
          "https://swapi.dev/api/people/14/",
          "https://swapi.dev/api/people/15/",
          "https://swapi.dev/api/people/16/",
          "https://swapi.dev/api/people/18/",
          "https://swapi.dev/api/people/19/",
          "https://swapi.dev/api/people/81/"
        ],
        "planets": [
          "https://swapi.dev/api/planets/1/",
          "https://swapi.dev/api/planets/2/",
          "https://swapi.dev/api/planets/3/"
        ],
        "starships": [
          "https://swapi.dev/api/starships/2/",
          "https://swapi.dev/api/starships/3/",
          "https://swapi.dev/api/starships/5/",
          "https://swapi.dev/api/starships/9/",
          "https://swapi.dev/api/starships/10/",
          "https://swapi.dev/api/starships/11/",
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/13/"
        ],
        "vehicles": [
          "vehiculo 1"
        ],
        "species": [
          "https://swapi.dev/api/species/1/",
          "https://swapi.dev/api/species/2/",
          "https://swapi.dev/api/species/3/",
          "https://swapi.dev/api/species/4/",
          "https://swapi.dev/api/species/5/"
        ],
        "created": "2014-12-10T14:23:31.880000Z",
        "edited": "2014-12-20T19:49:45.256000Z",
        "url": "https://swapi.dev/api/films/1/"
      };

      mockContentService.create = jest.fn().mockResolvedValueOnce(mockContent);
      const role: Role = Role.ADMIN;
      const result = await contentController.createNewContent(
        newContent as CreateContentDto,
        role as Role,
      );

      expect(contentService.createContent).toHaveBeenCalled();
      expect(result).toEqual(mockContent);
    });
  });
      
  describe('updateContent', () => {
        it('should update a book by its episode_id', async () => {
      const updatedContent = { ...mockContent, title: 'Updated name' };
      const content = { title: 'Updated name' };
      const role: Role = Role.ADMIN;

      mockContentService.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedContent);

      const result = await contentController.updateContent(
        mockContent.episode_id,
        content as UpdateContentDto,
        role
      );

      expect(contentService.updateContent).toHaveBeenCalled();
      expect(result).toEqual(updatedContent);
    });
  });

  describe('deleteContent', () => {
    it('should delete a content by episode_id', async () => {
      const role: Role = Role.ADMIN;
      const result = await contentController.deleteContent(mockContent.episode_id, Role);

      expect(contentService.deleteContent).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
