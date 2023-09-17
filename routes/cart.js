const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');
const cartController = require('../controllers/CartController');

// Add item to cart
router.post('/add', cartController.addItem );

// Update item quantity in cart
router.patch('/:id',cartController.updateItem);

// \Remove item from cart
router.delete('/:id',cartController.deleteItem);

//Checkout cart
router.post('/checkout',cartController.checkoutCart);



// get products for one user

router.get('/:userId',cartController.userProducts );
  





module.exports = router;