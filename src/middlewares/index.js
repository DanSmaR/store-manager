const errorHandlerMiddleware = require('./handleErrorMiddleware');
const validateNewProduct = require('./validateNewProduct');
const validateNewSales = require('./validateNewSales');

module.exports = {
  errorHandlerMiddleware,
  validateNewProduct,
  validateNewSales,
};
