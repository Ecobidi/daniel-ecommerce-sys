const CustomerModel = require('../models/customer')

class CustomerService {
  static async findAll() {
    return CustomerModel.find({})
  }

  static async findById(customer_id) {
    return CustomerModel.findById(customer_id)
  }

  static async findByEmail(email) {
    return CustomerModel.findOne({email})
  }

  static async save(customer_dao) {
    return CustomerModel.create(customer_dao)
  }

  static async removeOne(customer_id) {
    return CustomerModel.findByIdAndRemove(customer_id)
  }

}

module.exports = CustomerService