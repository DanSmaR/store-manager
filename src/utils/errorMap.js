const errorMap = {
  DATABASE_ERROR: 500,
  PRODUCT_NOT_FOUND: 404,
  SALES_NOT_FOUND: 404,
  INVALID_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = mapError;
