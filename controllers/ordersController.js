const orders = require("../Models/orders");
const User = require("../Models/Users");
const Product = require("../Models/products");

exports.createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const { user, products, shippingAddress, delStatus, totalAmount } =
      req.body;
    const order = new orders({
      user,
      products,
      shippingAddress,
      delStatus,
      totalAmount,
    });
    const savedOrder = await order.save();
    res.status(201).json({message : "Order Saved Successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error : error.message})
  }
};

exports.getAllOrders = async (req, res) => {
  const order = await orders.find();
  res.send({ data: order });
};

exports.getById = async (req, res) => {
  const order = await orders.findById(req.params.id);
  res.send(order);
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orders.findByIdAndUpdate(
      req.params.id,
      { delStatus: req.body.delStatus }, // Update the delStatus field with the new value
      { new: true } // Return the updated order after the update is applied
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delOrder = async (req, res) => {
  const deleted = await orders.findByIdAndDelete(req.params.id);
  res.send(deleted);
};

// Get all orders for a selected user ID
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const userOrders = await orders.find({user: userId }).populate({
      path: 'products.product',
      select : "name price image "
    })
    console.log(userOrders)
    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-----------------------------------------------------------------------------------------------------
exports.updateCheckRate = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { checkRate } = req.body;

    // Update the checkRate field of the order in your database using Mongoose or any other ORM
    const order = await orders.findByIdAndUpdate(orderId, { checkRate });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ message: "Rate added successfully" });
  } catch (error) {
    console.error("Error updating checkRate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//---------------------------------------------------------------------------------------
// Get all orders for selected seller by sellerId
exports.getAllSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Find seller by sellerId and role "seller"
    const seller = await User.findOne({ _id: sellerId, role: "seller" });

    if (!seller) {
      return res.status(404).json({
        error: 'Seller not found or does not have the role "seller".',
      });
    }

    // Find orders for the selected sellerId
    const sellerOrders = await orders.find({ sellerId });

    // Fetch user details for each order
    const ordersWithUserDetails = await Promise.all(
      sellerOrders.map(async (order) => {
        const userId = order.userId;
        const productId = order.productId;

        // Find user details by userId
        const user = await User.findById(userId);

        // Find product details by productId
        const product = await Product.findById(productId);

        return {
          _id: order._id,
          productName: order.productName,
          user: {
            userId: user._id,
            email: user.email,
            name: user.name,
            // Include other user details if needed
          },
          product: {
            productId: product._id,
            name: product.name,
            price: product.price,
            // Include other product details if needed
          },
          phoneNumber: order.phoneNumber,
          qty: order.qty,
          shippingAddress: order.shippingAddress, // Fixed spelling here
          delStatus: order.delStatus,
          date: order.date,
          checkRate: order.checkRate,
          seller: {
            sellerId: seller._id,
            name: seller.name, // Include seller's name
            email: seller.email, // Include seller's email
            // Include other seller details if needed
          },
        };
      })
    );

    res.json({ data: ordersWithUserDetails });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
