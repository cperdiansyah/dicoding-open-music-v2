require('dotenv').config();

const Hapi = require('@hapi/hapi');

const songs = require('./api/songs');
const SongsService = require('./service/postgres/SongsService');
const SongsValidator = require('./validator/songs');

const albums = require('./api/albums');
const AlbumsService = require('./service/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

require('dotenv').config();

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
