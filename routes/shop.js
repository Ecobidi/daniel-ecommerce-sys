const router = require('express').Router()
const ShopController = require('../controllers/shop')

router.get('/login', ShopController.getLoginPage)

router.post('/login', ShopController.handleLogin)

router.get('/register', ShopController.getRegisterPage)

router.post('/register', ShopController.handleRegister)

router.use('/', (req, res, next) => {
  if (req.session.customer) next()
  else res.redirect('/shop/login')
})

router.get('/', ShopController.getShopHome)

// router.get('/product/:product_id', ShopController.getProductPage)

router.get('/cart', ShopController.getCartPage)

router.get('/cart/add', ShopController.handleAddToCart)

router.post('/checkout', ShopController.handleCheckout)

router.get('/cart/remove', ShopController.handleRemoveFromCart)

router.get('/orders', ShopController.getOrdersPage)

router.get('/logout', ShopController.handleLogout)

module.exports = router