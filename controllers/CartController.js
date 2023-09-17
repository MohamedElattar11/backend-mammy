const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart");

// Add item to cart
exports.addItem = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    const cartItem = await Cart.create({ user, product, quantity });
    res.status(201).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update item quantity in cart
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await Cart.findOneAndUpdate(
      { product: id },
      { quantity: quantity }
    );

    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findOneAndDelete({ product: id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.userProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find all cart items for the user and populate the 'product' field
    const cartItems = await Cart.find({ user: userId }).populate("product");

    // Create an array to store the products and their quantities
    const products = [];

    // Loop through each cart item and add the product to the products array with its quantity
    cartItems.forEach((cartItem) => {
      const product = cartItem.product;
      const quantity = cartItem.quantity;

      products.push({
        ...product.toObject(),
        quantity: quantity,
      });
    });

    // Return the products with their quantities as the response
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Checkout cart
exports.checkoutCart = async (req, res) => {
  try {
    // Perform any necessary actions to process the order, such as creating a new Order document
    // based on the items in the cart.
    // Once the order is processed, delete all items from the cart.
    await Cart.deleteMany({});
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
