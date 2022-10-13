const { resultTypes } = require('../utils/errorResults');
const connection = require('./db/connection');

const listAll = async () => {
  try {
    const [products] = await connection.execute(
      'SELECT * FROM product',
    );
    return { type: null, message: products };
  } catch (error) {
    console.error({ error: error.message });
    return { type: resultTypes.databaseError, message: error.message };
  }
};

module.exports = {
  listAll,
};
