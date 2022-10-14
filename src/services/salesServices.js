const { databaseError } = require('../../tests/unit/utils/modulesResponses');
const { salesModels } = require('../models');
const { resultTypes } = require('../utils/errorResults');

const resgisterSales = async (salesList) => {
  const { type: msgType, message: newSalesId } = await salesModels.insert(salesList);
  if (msgType === resultTypes.databaseError) return databaseError;
  const { type, message } = await salesModels.findById(newSalesId);
  if (type === resultTypes.databaseError) return databaseError;
  if (type === resultTypes.saleNotFound) return { type, message };
  const response = {
    id: message[0].sale_id,
    itemsSold: message.map((item) => ({ productId: item.product_id, quantity: item.quantity })),
  };
  return { type: null, message: response };
};

// const getSale = async (saleId) => {
//   const { type, message } = await salesModels.findById(saleId);
//   if (type === resultTypes.databaseError) return databaseError;
// };

module.exports = {
  resgisterSales,
  // getSale,
};
