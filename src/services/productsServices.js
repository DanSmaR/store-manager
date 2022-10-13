const { databaseError } = require('../../tests/unit/utils/modulesResponses');
const { productsModels } = require('../models');
const { resultTypes, resultMsg } = require('../utils/errorResults');

const listAll = async () => {
  const { type, message } = await productsModels.listAll();
  if (type) return databaseError;
  return { type: null, message };
};

const findById = async (productId) => {
  const { type, message } = await productsModels.findById(productId);
  if (type === resultTypes.databaseError) return databaseError;
  if (type === resultTypes.productNotFound) {
    return { type: resultTypes.productNotFound, message: resultMsg.productNotFound };
  }
  return { type: null, message };
};

module.exports = {
  listAll,
  findById,
};
