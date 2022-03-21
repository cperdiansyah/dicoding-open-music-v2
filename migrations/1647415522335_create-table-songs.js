/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'SMALLINT ',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
      notNull: false,
    },
    albumId: {
      type: 'TEXT',
      notNull: false,
    },
  });

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel albums
  pgm.addConstraint(
    'songs',
    'fk_albums.albums.id',
    'FOREIGN KEY("albumId") REFERENCES albums(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_albums.albums.id');
  pgm.dropTable('songs');
};
