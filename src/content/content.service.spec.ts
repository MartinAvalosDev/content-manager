import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../auth/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { Content } from './schemas/content.schema';
import { ContentService } from './content.service';
import { Role } from 'src/auth/dtos/signup.dto';
import { CreateContentDto } from './dtos/create-content.dto';
import { UpdateContentDto } from './dtos/update-content.dto';

describe('ContentService', () => {
  let contentService: ContentService;
  let model: Model<Content>;

  const mockContent = {
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
    "url": "https://swapi.dev/api/films/1/",
    "user":{
      "role":"Administrador",
      "email":"djsdo@gmail.com",
      "password": "hhadhada"
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
      providers: [
        ConfigService,
        {
          provide: getModelToken(Content.name),
          useValue: mockContentService,
        },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    model = module.get<Model<Content>>(getModelToken(Content.name));
  });

  describe('findContents', () => {
    it('should return an array of contetns', async () => {
      const role: Role = Role.USER;

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockContent]),
            }),
          } as any),
      );

      const result = await contentService.findContents(role);

      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'test', $options: 'i' },
      });

      expect(result).toEqual([mockContent]);
    });
  });
  
  describe('findContentById', () => {
    it('should find and return a content by ID', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockContent);
      const role: Role = Role.USER;
      
      const result = await contentService.findContentById(mockContent.episode_id, role);
      
      expect(model.findOne).toHaveBeenCalledWith(mockContent.episode_id);
      expect(result).toEqual(mockContent);
    });
    
    it('should throw UnauthorizedException if invalid role is provided', async () => {
      const role: Role = Role.ADMIN;
      
      const isValidObjectIDMock = jest
      .spyOn(mongoose, 'isValidObjectId')
      .mockReturnValue(false);
      
      await expect(contentService.findContentById(mockContent.episode_id, role )).rejects.toThrow(
        NotFoundException,
        );
        
        expect(isValidObjectIDMock).toHaveBeenCalledWith(mockContent.episode_id);
        isValidObjectIDMock.mockRestore();
      });
      
      it('should throw NotFoundException if content is not found', async () => {
        jest.spyOn(model, 'findOne').mockResolvedValue(null);
        const role: Role = Role.USER;
        const episode_id = 345;
        
        await expect(contentService.findContentById(episode_id,role )).rejects.toThrow(
          NotFoundException,
          );
          
          expect(model.findOne).toHaveBeenCalledWith(mockContent.episode_id);
        });
  });
  describe('createContent', () => {
    it('should create and return a content', async () => {
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

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockContent as any));

      const result = await contentService.createContent(
        newContent as CreateContentDto,
        mockRole as Role,
      );

      expect(result).toEqual(mockContent);
    });
  });
      
  describe('updateContent', () => {
        it('should update and return a book', async () => {
      const updatedContent = { ...mockContent, title: 'Updated name' };
      const content = { title: 'Updated name' };
      const role: Role = Role.USER;

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedContent);

      const result = await contentService.updateContent(mockContent.episode_id, updatedContent as any, role as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockContent.episode_id, content, {
        new: true,
        runValidators: true,
      });

      expect(result.title).toEqual(content.title);
    });
  });

  describe('deleteContent', () => {
    it('should delete and return a content', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockContent);
      const role: Role = Role.ADMIN;

      const result = await contentService.deleteContent(mockContent.episode_id, role);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockContent.episode_id);

      expect(result).toEqual(mockContent);
    });
  });
});