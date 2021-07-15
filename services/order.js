const OrderModel = require('../models/order')

class OrderService {
  static ORDER_CANCELLED = 'cancelled'
  static ORDER_DELIVERED = 'delivered'
  static ORDER_IN_PROGRESS = 'in-progress'

  static async findAll() {
    return OrderModel.find({}).populate('customer', '_id first_name last_name email').exec()
  }

  static async findById(order_id) {
    return OrderModel.findById(order_id).populate('customer', '_id first_name last_name email').exec()
  }

  static async findByCustomer(customer_id) {
    return OrderModel.find({customer: customer_id}).populate('customer', '_id first_name last_name email').exec()
  }

  static async save(order_dao) {
    return OrderModel.create(order_dao)
  }

  static async updateOrderStatus(order_id, status) {
    return OrderModel.findOneAndUpdate(order_id, {$set: {delivery_status: status}})
  }

  static async removeOne(order_id) {
    return OrderModel.findByIdAndRemove(order_id)
  }

}

module.exports = OrderService