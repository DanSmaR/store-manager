const { createCustomError } = require('../errors/customError');
const { productsServices } = require('../services');
const mapError = require('../utils/errorMap');

const checkHasProduct = async (req, _res, next) => {
  const { productId } = req.params;
  const { type, message } = await productsServices.findById(productId);
  if (type) throw createCustomError(message, mapError(type));
  req.result = { type, message };
  return next();
};

module.exports = checkHasProduct;
