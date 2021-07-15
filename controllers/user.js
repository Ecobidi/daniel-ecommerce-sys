let UserService = require('../services/user')

class UserController {
  static async getAllUsersPage(req, res) {
    try {
      let users
      if (req.query.search) {
        users = await UserService.findByName(req.query.search)
      } else {
        users = await UserService.findAll()
      }
      res.render('users', { users })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/users')
    }
  }

  static async createUser(req, res) {
    try {
      if (req.body.password != req.body.retype_password) {
        req.flash('error_msg', 'User Could Not Be Created, Passwords Do Not Match')
        return res.redirect('/users')
      }
      await UserService.save(req.body)
      req.flash('success_msg', 'Category Successfully Created')
      res.redirect('/users')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/users')
    }
  }

  static async removeUser(req, res) {
    try {
      await UserService.removeOne(req.params.user_id)
      req.flash('success_msg', 'User Successfully Removed')
      res.redirect('/users')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/users')
    }
  }
}

module.exports = UserController