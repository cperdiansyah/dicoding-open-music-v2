const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(albumsService, validator) {
    this._albumsService = albumsService;
    this._validator = validator;
  }

  async postAlbumsHandler(request, h) {
    try {
      this._validator;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  //   async getAlbumsByIdHandler() {}
  //   async putAlbumsByIdHandler() {}
  //   async deleteAlbumsByIdHandler() {}
}
module.exports = AlbumsHandler;
