let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  in_stock: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderLimit: {
    type: Number,
    default: 5,
  },
  size: String,
  color: String,
  image: String,
});

module.exports = mongoose.model("product", productSchema);