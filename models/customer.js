let mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  last_name: {
    type: String,
  },
  first_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("customer", customerSchema);