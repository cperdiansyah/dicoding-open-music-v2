const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumsHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { name = 'untitled', year } = request.payload;
      const noteId = this._service.addAlbum(name, year);

      const response = h.response({
        satus: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
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
}

module.exports = AlbumsHandler;
