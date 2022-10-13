const asyncWrapper = require('../utils/asyncWrapper');
const { resultTypes, resultMsg } = require('../utils/errorResults');
const connection = require('./db/connection');

const listAll = asyncWrapper(async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return { type: null, message: products };
});

const findById = asyncWrapper(async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', [productId],
  );
  if (product) return { type: null, message: product };
  return { type: resultTypes.productNotFound, message: resultMsg.productNotFound };
});

const insert = asyncWrapper(async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)', [name],
  );
  return { type: null, message: insertId };
});

module.exports = {
  listAll,
  findById,
  insert,
};
