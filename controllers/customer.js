let CustomerService = require('../services/customer')

class CustomerController {
  static async getAllCustomersPage(req, res) {
    try {
      let customers = await CustomerService.findAll()
      res.render('customers', { customers })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/customers')
    }
  }

  static async createCustomerPage(req, res) {
    res.render('customers-new')
  }

  static async createCustomer(req, res) {
    if (req.password != req.retype_password) {
      req.flash('error_msg', 'Passwords Do Not Match!')
      return res.redirect('/customers/new')
    }
    try {
      await CustomerService.save(req.body)
      req.flash('success_msg', 'Account Created')
      res.redirect('/shop')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/customers')
    }
  }

  static async removeCustomer(req, res) {
    try {
      await CustomerService.removeOne(req.params.customer_id)
      req.flash('success_msg', 'Category Successfully Removed')
      req.redirect('/customers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/customers')
    }
  }
}

module.exports = CustomerController