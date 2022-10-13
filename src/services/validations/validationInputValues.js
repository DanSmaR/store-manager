const { getResponse } = require('../../../tests/unit/utils/modulesResponses');
const { resultTypes } = require('../../utils/errorResults');
const { newProductSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate({ name });
  if (error) return getResponse(resultTypes.invalidValue, error.message);
  return getResponse(null, '');
};

module.exports = {
  validateNewProduct,
};
