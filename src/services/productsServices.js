const { productsModels } = require('../models');
const { resultTypes, resultMsg } = require('../utils/errorResults');

const databaseError = {
  type: resultTypes.databaseError, message: resultMsg.databaseError,
};

const listAll = async () => {
  const { type, message } = await productsModels.listAll();
  if (type) return databaseError;
  return { type: null, message };
};

const findById = async (productId) => {
  const { type, message } = await productsModels.findById(productId);
  if (type) return databaseError;
  if (message) return { type: null, message };
  return { type: resultTypes.productNotFound, message: resultMsg.productNotFound };
};

module.exports = {
  listAll,
  findById,
};
