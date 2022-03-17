const Joi = require('joi');

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
});

module.exports = { PlaylistPayloadSchema };
