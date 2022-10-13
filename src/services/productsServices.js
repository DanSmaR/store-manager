const { productsModels } = require('../models');
const { resultTypes, resultMsg } = require('../utils/errorResults');

const listAll = async () => {
  const { type, message } = await productsModels.listAll();
  if (type) return { type: resultTypes.databaseError, message: resultMsg.databaseError };
  return { type: null, message };
};

module.exports = {
  listAll,
};
