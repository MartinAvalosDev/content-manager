<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Informacion sobre [content-manager]:

content-manager es una API basada en la data que se obtiene en SWAPI, la api de star wars.
Su funcion es operar con los contenidos, se puede crear, editar, eliminar, y obtener peliculas.
Ademas cuenta con un proceso de signup y login, el cual nos permite autenticarnos y acceder a los diferentes endpoints en caso de estar autorizados.

Muy importante, el primer paso antes de interacturar con la app, es cargar la base de datos con peliculas base obtenidas desde SWAPI. Para ello debemos correr el endpoint /coldStart,
el cual no pide credenciales de ningun tipo.

El primer paso es registranos en /signup, luego con el mismo email y password pasaremos a logearos en /login. 
Una vez que hayamos iniciado sesion podremos operar los distintos metodos mencionados anteriormente.
Debemos pasar por Authorization header el token que hayamos recibido en el login. (Atencion! ese token lleva dentro el rol y user_id de mongo, por lo cual en todo momento la app sabra que rol tiene ese usuario a traves del token, ademas de autenticarlo)

Solo queda mirar el codigo y las buenas practicas llevadas a cabo, modularizando los componentes de auth y contents, creando colecciones distintas de mongo para los users y para los contents, usando Dto´s para validar los campos del body, enviados tanto para crear como updatear contenidos (Tienen distintas validaciones).

## Informacion sobre archivo .ENV:

Será necesario agregar un .env file para correr la app.

MONGO_URI=mongodb://localhost:27017/content-manager

JWT_SECRET=martinavalosdev
JWT_EXPIRES=1d

## Informacion sobre MONGODB:

La aplicacion utiliza una base de datos MongoDB. Recomiendo descargar mongoDB Compass, y crear una nueva conexion para poder visualizar como se guardan en distintas colecciones los documentos creados a lo largo de la app.
## Informacion sobre los [/ENDPOINTS]:

/coldStart [RutaPublica]
-[POST] /contens/coldStart :
Permite cargar la base de datos con las peliculas obtenidas desde SWAPI. Una vez que se corra este endpoint, se puede seguir con el proceso e2e desde signup, login , y las distintas rutas funcionales.
curl postman:
curl --location --request POST 'http://localhost:3000/contents/coldStart'

/auth [RutasPublicas]

-[POST] /auth/signup :
Permite crear un nuevo user, en el body pasaremos por unica vez el ROL de esta credencial, el email, y el password. Retorna un string validando el signup. En el campo "role" podremos elegir entre crearnos un user "Usuario Regular" o "Administrador", en este curl esta seteado el perfil Administrador. Guarda el registro en la coleccion de users.
curl postman:
curl --location 'http://localhost:3000/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "role": "Administrador",
    "email": "martin_admin@conexa.com",
    "password": "H0la1234"
}'

-[POST] /auth/login :
Permite logearnos con email y password. Retorna un token de acceso para las rutas restringidas, y un mensaje de validacion. Tiene que coincidir con user ya registrado previamente en /signup, importante logearse, de lo contrario no podremos acceder a ninguna ruta por mas token que mandemos en las pegadas de /contents que veremos mas adelante.
curl postman:
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "martin_admin@conexa.com",
    "password": "H0la1234"
}'

/contents [RutasRestringidas]

-[GET] /contents :
Retorna un array de {contenido} que estan almacenados en la base de datos.(Solo tiene acceso el rol USER).
Curl postman: 
curl --location 'http://localhost:3000/contents/' \
--header 'Authorization: Bearer [tokenUSER]'

-[GET] /contents/:episode_id :
Retorna un {contenido} y sus detalles, a traves del episode_id que se haya pasado. No se utilizó el "_id" de mongo, ya que se queria lograr una experiencia mas amigable. (Solo tiene acceso el rol USER).
Curl postman: 
curl --location 'http://localhost:3000/contents/1' \
--header 'Authorization: Bearer [tokenUSER]'

-[POST] /contents/newContent : 
Agrega una nueva pelicula a la coleccion de contents, se requiere autorizacion con token obtenido en /auth/login (Solo tiene acceso el rol ADMIN). En el body pasaremos un json que coincida con el [CreateContentDto], donde se valida que se cumplan todos los campos, de no ser asi no se podra agregar un nuevo contenido. Retorna la pelicula agregada.
Curl postman: 
curl --location 'http://localhost:3000/contents/newContent' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [tokenADMIN]' \
--data '{
    "title": "Pelicula Prueba",
    "episode_id": 12,
    "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire'\''s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire'\''s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
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
    "vehicles":[
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
}'

-[PUT] /contents/updateContent/:episode_id : Actualiza una pelicula existente en la coleccion de contents, se requiere autorizacion con token obtenido en /auth/login (Solo tiene acceso el rol ADMIN). En el body pasaremos un json que coincida con el [UpdateContentDto], donde se valida que se cumplan todos los campos, de no ser asi no se podra agregar un nuevo contenido.
curl postman: 
curl --location --request PUT 'http://localhost:3000/contents/updateContent/3' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [tokenADMIN]' \
--data '{
    "title": "la uno actualizadaa",
    "episode_id": 1,
    "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire'\''s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire'\''s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
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
}'

-[DELETE] /contents/deleteContent/:episode_id :
Elimina un {contenido} y retorna sus detalles, a traves del episode_id que se haya pasado. No se utilizó el "_id" de mongo, ya que se queria lograr una experiencia mas amigable. (Solo tiene acceso el rol ADMIN).
Curl postman: 
curl --location --request DELETE 'http://localhost:3000/contents/deleteContent/1' \
--header 'Authorization: Bearer [tokenADMIN]'
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
