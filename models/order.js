let mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
  },
  products: [],
  created_at: {
    type: Date,
    default: Date.now,
  },
  payment_type: {
    type: String,
    enum: ['Cash-on-delivery', 'Card-payment'],
    default: 'Card-payment'
  },
  card_num: String,
  card_cvv: String,
  delivery_status: {
    type: String, // -1 => cancelled, 0 => inprogress, 1 => fulfilled
    enum: ['cancelled', 'in-progress', 'delivered'],
    default: 'in-progress'
  },
  delivery_address: {
    type: String,
  },
});

module.exports = mongoose.model("order", orderSchema);