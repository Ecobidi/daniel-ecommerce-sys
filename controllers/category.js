let CategoryService = require('../services/category')

class CategoryController {
  static async getAllCategoriesPage(req, res) {
    try {
      let categories = await CategoryService.findAll()
      res.render('categories', { categories })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/categories')
    }
  }

  static async createCategory(req, res) {
    try {
      await CategoryService.save(req.body)
      req.flash('success_msg', 'Category Successfully Created')
      res.redirect('/categories')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/categories')
    }
  }

  static async removeCategory(req, res) {
    try {
      await CategoryService.removeOne(req.params.category_id)
      req.flash('success_msg', 'Category Successfully Removed')
      res.redirect('/categories')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/categories')
    }
  }
}

module.exports = CategoryController