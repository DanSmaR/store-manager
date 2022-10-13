const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(productsController.listAllProducts);

router.route('/:productId')
  .get(productsController.getOneProduct);

module.exports = router;
