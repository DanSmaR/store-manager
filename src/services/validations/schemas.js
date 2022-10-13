const Joi = require('joi');

const newProductSchema = Joi.object({
  name: Joi.string().trim().min(5).required(),
});

module.exports = {
  newProductSchema,
};
