const mongoose = require('mongoose')

let CartSchema = mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    unique: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  products_quantities: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
})

module.exports = mongoose.model('cart', CartSchema)