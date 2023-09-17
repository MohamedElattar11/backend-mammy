const mongoose = require("mongoose");

//Creating orders schema
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
products : [
  {
    product : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity : {
      type :  Number,
      required: true
    },
    price:{
      type : Number,
      required: true
    }
  }
],
    shippingAdress: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      zipCode: { type: String, required: false },
      country: { type: String, required: false },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    delStatus: {
      type: String,
      enum: ["pending", "delivered", "canceled", "shipped"],
      default: "pending",
    },
    // payMethod:{type: String}, to be handeld later
    date: { type: Date, default: Date.now },
    checkRate: { type: Boolean, default: false }, // New field for check rate
  },
  {
    strict: false,
    versionKey: false,
  }
);

const orders = mongoose.model("Orders", orderSchema);

module.exports = orders;
