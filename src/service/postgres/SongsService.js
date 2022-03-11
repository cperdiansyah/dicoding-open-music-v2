/* eslint-disable object-curly-newline */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong(name, title, year, performer, genre, duraion, albumId) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [id, name, title, year, performer, genre, duraion, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query('SELECT * FROM songs');
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount[0].id) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows[0];
  }

  async editSongById(
    id,
    // eslint-disable-next-line comma-dangle
    { name, title, year, performer, genre, duraion, albumId }
  ) {
    const query = {
      text: 'UPDATE songs SET name = $1, title = $2, year = $3, performer = $4, genre = $5, duraion = $6, albumId = $7 WHERE id = $8 RETURNING id',
      values: [name, title, year, performer, genre, duraion, albumId, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal diedit');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus');
    }
  }
}

module.exports = SongsService;
