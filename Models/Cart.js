const mongoose = require('mongoose');
const Product = require('./products')
const User = require('./Users')

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// kfjdfndkf

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart