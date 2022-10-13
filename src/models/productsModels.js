const { resultTypes } = require('../utils/errorResults');
const connection = require('./db/connection');

function errorDatabase(error) {
  console.error({ error: error.message });
  return { type: resultTypes.databaseError, message: error.message };
}

const listAll = async () => {
  try {
    const [products] = await connection.execute(
      'SELECT * FROM products',
    );
    return { type: null, message: products };
  } catch (error) {
    return errorDatabase(error);
  }
};

const findById = async (productId) => {
  try {
    const [[product]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?', [productId],
    );
    return { type: null, message: product };
  } catch (error) {
    return errorDatabase(error);
  }
};

module.exports = {
  listAll,
  findById,
};
