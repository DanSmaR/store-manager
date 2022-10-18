const errorHandlerMiddleware = require('./handleErrorMiddleware');
const validateNewProduct = require('./validateNewProduct');
const validateNewSales = require('./validateNewSales');
const checkHasProduct = require('./checkHasProduct');

module.exports = {
  errorHandlerMiddleware,
  validateNewProduct,
  validateNewSales,
  checkHasProduct,
};
