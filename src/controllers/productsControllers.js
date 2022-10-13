const { createCustomError } = require('../errors/customError');
const { productsServices } = require('../services');
const { resultMsg } = require('../utils/errorResults');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsServices.listAll();
  if (type) throw Error(resultMsg.databaseError);
  res.status(200).json(message);
};

module.exports = {
  listAllProducts,
};
