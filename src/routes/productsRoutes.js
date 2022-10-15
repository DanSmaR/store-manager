const express = require('express');
const { validateNewProduct, checkHasProduct } = require('../middlewares');
const { productsController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(productsController.listAllProducts)
  .post(validateNewProduct, productsController.registerProduct);

router.route('/:productId')
  .get(checkHasProduct, productsController.getOneProduct)
  .put(validateNewProduct, productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
