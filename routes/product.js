const router = require('express').Router()
const ProductController = require('../controllers/product')

router.get('/', ProductController.getAllProductsPage)

router.get('/new', ProductController.createProductPage)

router.post('/new', ProductController.createProduct)

router.get('/remove/:product_id', ProductController.removeProduct)

module.exports = router