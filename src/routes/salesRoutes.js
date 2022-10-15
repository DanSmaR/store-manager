const express = require('express');
const { validateNewSales } = require('../middlewares');

const { salesController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(salesController.getAllSales)
  .post(validateNewSales, salesController.registerSales);

router.route('/:saleId')
  .get(salesController.getSale)
  .delete(salesController.deleteSales)
  .put(validateNewSales, salesController.updateSales);

module.exports = router;
