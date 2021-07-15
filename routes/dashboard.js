let router = require("express").Router();
const CategoryService = require('../services/category')
const CustomerService = require('../services/customer')
const OrderService = require('../services/order')
const ProductService = require('../services/product')

router.get("/", async function(req, res) {
  let customers = await CustomerService.findAll()
  let categories = await CategoryService.findAll()
  let products = await ProductService.findAll()
  let orders = await OrderService.findAll()
  let recentProducts = products.slice(0, 10)
  let recentOrders = orders.slice(0, 10)
  
  recentOrders.forEach(o => { 
    o.customer_name = `${o.customer.first_name} ${o.customer.last_name}`
    o.date_of_order = o.created_at.toGMTString()
  })

  res.render("reports", { recentOrders, recentProducts, orders_count: orders.length, categories_count: categories.length, products_count: products.length, customers_count: customers.length
  });
});

module.exports = router;