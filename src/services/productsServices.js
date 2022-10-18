const { databaseError } = require('../../tests/unit/utils/modulesResponses');
const { productsModels } = require('../models');
const { resultTypes } = require('../utils/errorResults');
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

const updateProduct = async (productId, name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;
  const { type: msgType, message } = await productsModels.update(productId, name);
  if (msgType === resultTypes.databaseError) return databaseError;
  if (msgType === resultTypes.productNotFound) return { type: msgType, message };
  const { type, message: updatedProduct } = await productsModels.findById(productId);
  if (type === resultTypes.databaseError) return databaseError;
  return { type: null, message: updatedProduct };
};

const removeProduct = async (productId) => {
  const { type: msgType, message } = await productsModels.remove(productId);
  if (msgType === resultTypes.databaseError) return databaseError;
  if (msgType === resultTypes.productNotFound) return { type: msgType, message };
  return { type: null, message };
};

const searchProduct = async (query) => {
  const { type, message } = await productsModels.search(query);
  if (type) return databaseError;
  return { type, message };
};

module.exports = {
  listAll,
  findById,
  insertProduct,
  updateProduct,
  removeProduct,
  searchProduct,
};
