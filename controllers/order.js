const OrderService = require('../services/order')

class OrderController {
  static async getAllOrdersPage(req, res) {
    try {
      let orders = await OrderService.findAll()
      orders.forEach(o => { 
        o.customer_name = `${o.customer.first_name} ${o.customer.last_name}`
        o.date_of_order = o.created_at.toGMTString()
      })
      res.render('orders', {orders})
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error retrieving all orders')
      res.redirect('/')
    }
  }

  static async handleConfirmOrder(req, res) {
    try {
      await OrderService.updateOrderStatus(req.query.order_id, OrderService.ORDER_DELIVERED)
      res.redirect('/orders')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error confirming order')
      res.redirect('/')
    }
  }

  static async handleCancelOrder(req, res) {
    try {
      await OrderService.updateOrderStatus(req.query.order_id, OrderService.ORDER_CANCELLED)
      res.redirect('/orders')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error confirming order')
      res.redirect('/')
    }
  }
}

module.exports = OrderController