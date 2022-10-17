const Joi = require('joi');

const newProductSchema = Joi.object({
  name: Joi.string().trim().min(5).required(),
});

const newSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().label('productId').min(1),
  quantity: Joi.number().label('quantity').min(1),
}));

module.exports = {
  newProductSchema,
  newSaleSchema,
};
