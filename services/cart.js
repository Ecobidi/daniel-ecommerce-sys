const CartModel = require('../models/cart')

let findCartOrCreateIfNotExists = async (customer_id) => {
  let cart = await CartModel.findOne({customer_id})
  // create cart object if doesn't exist
  if (!cart) {
    await CartModel.create({ customer_id, products: [], products_quantities: new Object() })
    cart = await CartModel.findOne({customer_id})
  }
  return cart
}

class CartService {

  static async findCart(customer_id) {
    return CartModel.findOne({customer_id}).populate('products', '_id name price color in_stock size image').exec()
  }

  static async addItem(newItem, customer_id) {
    let cart = await findCartOrCreateIfNotExists(customer_id)
    let itemIndex = cart.products.findIndex((id => "" + id === "" + newItem.product_id))
    if (itemIndex > -1) {
      cart.products_quantities[newItem.product_id] = newItem.quantity
    } else {
      cart.products.push(newItem.product_id)
      cart.products_quantities[newItem.product_id] = newItem.quantity
    }
    cart.markModified('products_quantities')
    return cart.save()
  }

  static async removeItem(product_id, customer_id) {
    let cart = await CartModel.findOne({customer_id})
    let itemIndex = cart.products.findIndex((id => "" + id === "" + product_id))
    cart.products.splice(itemIndex, 1)
    delete cart.products_quantities[product_id]
    cart.markModified('products_quantities')
    return cart.save()
  }

  static async clearCart(customer_id) {
    return CartModel.remove({customer_id})
  }

}

module.exports = CartService