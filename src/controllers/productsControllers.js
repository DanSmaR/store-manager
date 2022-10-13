const { createCustomError } = require('../errors/customError');
const { productsServices } = require('../services');
const mapError = require('../utils/errorMap');
const { resultMsg } = require('../utils/errorResults');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsServices.listAll();
  if (type) throw Error(resultMsg.databaseError);
  res.status(200).json(message);
};

const getOneProduct = async (req, res) => {
  const { productId } = req.params;
  const { type, message } = await productsServices.findById(productId);
  if (type) throw createCustomError(message, mapError(type));
  res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  getOneProduct,
};
