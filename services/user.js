const UserModel = require('../models/user')

class UserService {
  static async findAll() {
    return UserModel.find({})
  }

  static async findById(user_id) {
    return UserModel.findById(user_id)
  }

  static async findByEmail(email) {
    return UserModel.findOne({email})
  }
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return UserModel.find({$or: [{last_name: pattern, first_name: pattern}]})
  }
  
  static async save(user_dao) {
    return UserModel.create(user_dao)
  }

  static async removeOne(user_id) {
    return UserModel.findByIdAndRemove(user_id)
  }

}

module.exports = UserService