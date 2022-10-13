const resultTypes = {
  invalidValue: 'INVALID_VALUE',
  productNotFound: 'PRODUCT_NOT_FOUND',
  saleNotFound: 'SALE_NOT_FOUND',
  databaseError: 'DATABASE_ERROR',
};

const resultMsg = {
  idNumber: '"id" must be a number',
  productNotFound: 'Product not found',
  saleNotFound: 'Sale not found',
  databaseError: 'Database error',
};

module.exports = {
  resultTypes,
  resultMsg,
};
