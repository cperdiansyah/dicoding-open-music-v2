const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  performer: Joi.string().required(),
});
module.exports = SongPayloadSchema;
