const { databaseError } = require('../../tests/unit/utils/modulesResponses');
const { productsModels } = require('../models');
const { resultTypes, resultMsg } = require('../utils/errorResults');
const { validateNewProduct } = require('./validations/validationInputValues');

const listAll = async () => {
  const { type, message } = await productsModels.listAll();
  if (type) return databaseError;
  return { type: null, message };
};

const findById = async (productId) => {
  const { type, message } = await productsModels.findById(productId);
  if (type === resultTypes.databaseError) return databaseError;
  if (type === resultTypes.productNotFound) return { type, message };
  return { type: null, message };
};

const insertProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;
  const { type: msgType, message: newProductId } = await productsModels.insert(name);
  if (msgType === resultTypes.databaseError) return databaseError;
  const { type, message } = await productsModels.findById(newProductId);
  if (type === resultTypes.databaseError) return databaseError;
  return { type: null, message };
};

module.exports = {
  listAll,
  findById,
  insertProduct,
};
