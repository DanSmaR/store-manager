const { createCustomError } = require('../errors/customError');
const { salesServices } = require('../services');
const mapError = require('../utils/errorMap');
// const { resultMsg } = require('../utils/errorResults');

const registerSales = async (req, res) => {
  const salesList = req.body;
  const { type, message } = await salesServices.resgisterSales(salesList);
  if (type) throw createCustomError(message, mapError(type));
  res.status(201).json(message);
};

const getSale = async (req, res) => {
  const { saleId } = req.params;
  const { type, message } = await salesServices.getSale(saleId);
  if (type) throw createCustomError(message, mapError(type));
  res.status(200).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesServices.getAllSales();
  if (type) throw createCustomError(message, mapError(type));
  res.status(200).json(message);
};

module.exports = {
  registerSales,
  getSale,
  getAllSales,
};
