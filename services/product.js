const ProductModel = require('../models/product')

class ProductService {
  static async findAll() {
    return ProductModel.find({}).sort('-_id').exec()
  }

  static async findById(product_id) {
    return ProductModel.findById(product_id).sort('-_id').exec()
  }

  static async findByCategory(category) {
    return ProductModel.find({category}).sort('-_id').exec()
  }

  static async findByName(product_name) {
    let pattern = new RegExp(product_name, 'ig')
    return ProductModel.find({name: pattern}).sort('-_id').exec()
  }

  static async save(product_dao) {
    return ProductModel.create(product_dao)
  }

  static async removeOne(product_id) {
    return ProductModel.findByIdAndRemove(product_id)
  }

}

module.exports = ProductService