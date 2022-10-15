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
  const { message: product } = req.result;
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.updateProduct(productId, name);
  if (type) throw createCustomError(message, mapError(type));
  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.insertProduct(name);
  if (type) throw createCustomError(message, mapError(type));
  res.status(201).json(message);
};

module.exports = {
  listAllProducts,
  getOneProduct,
  registerProduct,
  updateProduct,
};
