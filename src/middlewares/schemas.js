const Joi = require('joi');

const newSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().label('productId').required(),
  quantity: Joi.number().label('quantity').required(),
}));

module.exports = {
  newSaleSchema,
};
