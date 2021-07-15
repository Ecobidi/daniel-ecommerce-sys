const CategoryModel = require('../models/category')

class CategoryService {
  static async findAll() {
    return CategoryModel.find({})
  }

  static async findById(service_id) {
    return CategoryModel.findById(service_id)
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return CategoryModel.find({name: pattern})
  }

  static async save(category_dao) {
    return CategoryModel.create(category_dao)
  }

  static async removeOne(category_id) {
    return CategoryModel.findByIdAndRemove(category_id)
  }

}

module.exports = CategoryService