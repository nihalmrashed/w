const express = require('express');
const router = express.Router();
//const logger = require('../middleware/logger').logger;
const orderController = require('../controllers/order.controller');

router.post('/view', orderController.viewAllOrders)
router.post('/viewbyID', orderController.viewOrderById)
router.post('/create', orderController.createOrder)
router.post('/update', orderController.updateOrder)
router.post('/delete', orderController.deleteOrder)
router.post('/log', orderController.log)
router.post('/diff', orderController.diff)

module.exports = router;
