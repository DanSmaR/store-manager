const asyncWrapper = require('../utils/asyncWrapper');
const { resultTypes, resultMsg } = require('../utils/errorResults');
const connection = require('./db/connection');

const listAll = asyncWrapper(async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return { type: null, message: products };
});

const findById = asyncWrapper(async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );
  if (product) return { type: null, message: product };
  return { type: resultTypes.productNotFound, message: resultMsg.productNotFound };
});

const insert = asyncWrapper(async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return { type: null, message: insertId };
});

const update = asyncWrapper(async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  if (affectedRows > 0) return { type: null, message: affectedRows };
  return { type: resultTypes.productNotFound, message: resultMsg.productNotFound };
});

module.exports = {
  listAll,
  findById,
  insert,
  update,
};
