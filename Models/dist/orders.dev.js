"use strict";

var mongoose = require('mongoose'); //Creating orders schema


var orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'products',
    required: true
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  // New field for seller ID
  phoneNumber: {
    type: Number
  },
  qty: {
    type: Number,
    required: false
  },
  shippingAdress: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    zipCode: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    }
  },
  delStatus: {
    type: String,
    "enum": ['pending', 'delivered', 'canceled', 'shipped'],
    "default": 'pending'
  },
  // payMethod:{type: String}, to be handeld later
  date: {
    type: Date,
    "default": Date.now
  },
  checkRate: {
    type: Boolean,
    "default": false
  } // New field for check rate

}, {
  strict: false,
  versionKey: false
});
var orders = mongoose.model('orders', orderSchema);
module.exports = orders;