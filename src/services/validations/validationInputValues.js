const { getResponse } = require('../../../tests/unit/utils/modulesResponses');
const { productsModels } = require('../../models');
const { resultTypes } = require('../../utils/errorResults');
const { newProductSchema, newSaleSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate({ name });
  if (error) return getResponse(resultTypes.invalidValue, error.message);
  return getResponse(null, '');
};

async function checkHasProduct(data) {
  return Promise.all(data
    .map(async ({ productId }) => productsModels.findById(productId)));
}

const validateNewSales = async (data) => {
  const { error } = newSaleSchema.validate(data);
  if (error) return getResponse(resultTypes.invalidValue, error.message);
  const errors = await checkHasProduct(data);
  const productNotFoundErrs = errors.filter(({ type }) => type === resultTypes.productNotFound);
  if (productNotFoundErrs.length) {
    return getResponse(resultTypes.productNotFound, productNotFoundErrs[0].message);
  }
  return getResponse(null, '');
};

module.exports = {
  validateNewProduct,
  validateNewSales,
};
