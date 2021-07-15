const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'admin',
  },
  last_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('user', UserSchema)