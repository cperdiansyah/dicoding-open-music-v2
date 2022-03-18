const Joi = require('joi');

const CollaborationPayloadSchema = Joi.object({
  playlist_id: Joi.string().required(),
  user_id: Joi.string().required(),
});

module.exports = { CollaborationPayloadSchema };
