const router = require('express').Router()
const OrderController = require('../controllers/order')

router.get('/', OrderController.getAllOrdersPage)

router.get('/confirm', OrderController.handleConfirmOrder)

router.get('/cancel', OrderController.handleCancelOrder)

module.exports = router