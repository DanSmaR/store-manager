const express = require('express');
const { validateNewProduct } = require('../middlewares');
const { productsController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(productsController.listAllProducts)
  .post(validateNewProduct, productsController.registerProduct);

router.route('/:productId')
  .get(productsController.getOneProduct);

module.exports = router;
