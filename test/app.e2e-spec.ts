import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('Content & Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.DB_URI, function () {
      mongoose.connection.db.dropDatabase();
    });
  });

  afterAll(() => mongoose.disconnect());

  const user = {
    role: "Administrador",
    email: 'martinavalos@gmail.com',
    password: '12345678',
  };

  const newContent = {
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
    url: "https://swapi.dev/api/films/1/"
  }

  let jwtToken: string = '';
  let contentCreated;

  describe('Auth', () => {
    it('(POST) - Register a new user', async () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(user)
        .expect(201)
        .then((res) => {
          expect(res.body.token).toBeDefined();
        });
    });

    it('(GET) - Login user', async () => {
      return request(app.getHttpServer())
        .get('/auth/login')
        .send({ email: user.email, password: user.password })
        .expect(200)
        .then((res) => {
          expect(res.body.token).toBeDefined();
          jwtToken = res.body.token;
        });
    });
  });

  describe('Contents', () => {
    it('(POST) - Create new Content', async () => {
      return request(app.getHttpServer())
        .post('/contens/newContent')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(newContent)
        .expect(201)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(newContent.title);
          contentCreated = res.body;
        });
    });

    it('(GET) - Get all contents', async () => {
      return request(app.getHttpServer())
        .get('/contents')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it('(GET) - Get a content by episode_id', async () => {
      return request(app.getHttpServer())
        .get(`/contents/${contentCreated?.episode_id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body._id).toEqual(contentCreated.episode_id);
        });
    });

    it('(PUT) - Update a content by episode_id', async () => {
      const content = { title: 'Updated name' };
      return request(app.getHttpServer())
        .put(`/content/updateContent/${contentCreated.episode_id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(content)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.title).toEqual(content.title);
        });
    });

    it('(DELETE) - Delete a content by episode_id', async () => {
      return request(app.getHttpServer())
        .delete(`/contents/deleteContent/${contentCreated?.episode_id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.deleted).toEqual(true);
        });
    });
  });
});