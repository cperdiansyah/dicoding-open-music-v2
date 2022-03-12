const mapDBToSongsModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
});

module.exports = { mapDBToSongsModel };
