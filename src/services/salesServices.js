const { databaseError } = require('../../tests/unit/utils/modulesResponses');
const { salesModels } = require('../models');
const { resultTypes } = require('../utils/errorResults');
const { validateNewSales } = require('./validations/validationInputValues');

const resgisterSales = async (salesList) => {
  const error = await validateNewSales(salesList);
  if (error.type) return error;
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

const updateSale = async (saleId, saleList) => {
  const error = await validateNewSales(saleList);
  if (error.type) return error;
  const { type: msgType, message } = await salesModels.update(saleId, saleList);
  if (msgType === resultTypes.databaseError) return databaseError;
  if (msgType === resultTypes.saleNotFound) return { type: msgType, message };
  const { type, message: updatedSale } = await salesModels.findById(saleId);
  if (type === resultTypes.databaseError) return databaseError;
  const response = {
    saleId,
    itemsUpdated: updatedSale
      .map((item) => ({ productId: item.product_id, quantity: item.quantity })),
  };
  return { type: null, message: response };
};

const getSale = async (saleId) => {
  const { type, message } = await salesModels.findByIdJoinDate(saleId);
  if (type === resultTypes.databaseError) return databaseError;
  if (type === resultTypes.saleNotFound) return { type, message };
  return { type: null, message };
};

const getAllSales = async () => {
  const { type, message } = await salesModels.findAllSales();
  if (type === resultTypes.databaseError) return databaseError;
  if (type === resultTypes.saleNotFound) return { type, message };
  return { type: null, message };
};

const removeSale = async (saleId) => {
  const { type: msgType, message } = await salesModels.remove(saleId);
  if (msgType === resultTypes.databaseError) return databaseError;
  if (msgType === resultTypes.saleNotFound) return { type: msgType, message };
  return { type: null, message };
};

module.exports = {
  resgisterSales,
  getSale,
  getAllSales,
  removeSale,
  updateSale,
};
