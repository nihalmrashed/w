const express = require('express');
const router = express.Router();
//const logger = require('../middleware/logger').logger;
const productController = require('../controllers/product.controller');

router.post('/view', productController.viewAllProducts)
router.post('/viewbyID', productController.viewProductById)
router.post('/create', productController.createProduct)
router.post('/update', productController.updateProduct)
router.post('/delete', productController.deleteProduct)

module.exports = router;
