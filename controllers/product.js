const fs = require('fs/promises')
const path = require('path')
const CategoryService = require('../services/category')
const ProductService = require('../services/product')

const { PRODUCT_IMAGE_PATH } = require('../config')

class ProductController {
  static async getAllProductsPage(req, res) {
    try {
      let products = await ProductService.findAll()
      res.render('products', { products })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/products')
    }
  }

  static async createProductPage(req, res) {
    try {
      let categories = await CategoryService.findAll()
      res.render('products-new', { categories })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/products')
    }
  }

  static async createProduct(req, res) {
    let dao = req.body
    try {
      if (req.files && req.files.image) {
        let imageExtension = path.extname(req.files.image.name);
        let productImageName = dao.name + '_' + Date.now() + imageExtension;
        dao.image = productImageName;
        await req.files.image.mv(PRODUCT_IMAGE_PATH + productImageName);
      }
      await ProductService.save(dao)
      req.flash('success_msg', 'Product Added')
      req.redirect('/products')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/products')
    }
  }

  static async removeProduct(req, res) {
    try {
      let product = await ProductService.findById(req,params.product_id)
      await fs.unlink(PRODUCT_IMAGE_PATH + product.image)
      await ProductService.removeOne(req.params.product_id)
      req.flash('success_msg', 'Product Removed')
      req.redirect('/products')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/products')
    }
  }
}

module.exports = ProductController