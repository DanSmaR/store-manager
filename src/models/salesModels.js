const camelize = require('camelize');

const asyncWrapper = require('../utils/asyncWrapper');
const { resultTypes, resultMsg } = require('../utils/errorResults');
const convertToSnakeCase = require('../utils/nameConverter');
const connection = require('./db/connection');

const insert = asyncWrapper(async (saleList) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  await Promise.all(saleList.map(async (sale) => {
    const saleObjWithId = { saleId: insertId, ...sale };
    const [columns, placeholders] = convertToSnakeCase(saleObjWithId);
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (${columns}) VALUES (${placeholders})`,
      [...Object.values(saleObjWithId)],
    );
  }));
  return { type: null, message: insertId };
});

const findById = asyncWrapper(async (saleId) => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [saleId],
    );
    console.log(sales);
  if (sales.length) return { type: null, message: sales };
  return { type: resultTypes.saleNotFound, message: resultMsg.saleNotFound };
});

const findByIdJoinDate = asyncWrapper(async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?`,
    [saleId],
  );
  console.log(sales);
  if (sales.length) return { type: null, message: camelize(sales) };
  return { type: resultTypes.saleNotFound, message: resultMsg.saleNotFound };
});

module.exports = {
  insert,
  findById,
  findByIdJoinDate,
};
