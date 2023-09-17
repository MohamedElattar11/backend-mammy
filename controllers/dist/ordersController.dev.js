"use strict";

var orders = require('../Models/orders');

var User = require('../Models/Users');

var Product = require('../Models/products');

exports.createOrder = function _callee(req, res) {
  var _req$body, productName, userId, sellerId, phoneNumber, productId, qty, shippingAddress, delStatus, date, order, savedOrder;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _req$body = req.body, productName = _req$body.productName, userId = _req$body.userId, sellerId = _req$body.sellerId, phoneNumber = _req$body.phoneNumber, productId = _req$body.productId, qty = _req$body.qty, shippingAddress = _req$body.shippingAddress, delStatus = _req$body.delStatus, date = _req$body.date;
          order = new orders({
            productName: productName,
            userId: userId,
            sellerId: sellerId,
            phoneNumber: phoneNumber,
            productId: productId,
            qty: qty,
            shippingAddress: shippingAddress,
            delStatus: delStatus,
            date: date
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(order.save());

        case 5:
          savedOrder = _context.sent;
          res.status(201).json({
            savedOrder: savedOrder,
            status: 201
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllOrders = function _callee2(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(orders.find());

        case 2:
          order = _context2.sent;
          res.send({
            data: order
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getById = function _callee3(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(orders.findById(req.params.id));

        case 2:
          order = _context3.sent;
          res.send(order);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateOrder = function _callee4(req, res) {
  var updatedOrder;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(orders.findByIdAndUpdate(req.params.id, {
            delStatus: req.body.delStatus
          }, // Update the delStatus field with the new value
          {
            "new": true
          } // Return the updated order after the update is applied
          ));

        case 3:
          updatedOrder = _context4.sent;

          if (updatedOrder) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Order not found'
          }));

        case 6:
          res.json(updatedOrder);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating order:', _context4.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.delOrder = function _callee5(req, res) {
  var deleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(orders.findByIdAndDelete(req.params.id));

        case 2:
          deleted = _context5.sent;
          res.send(deleted);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Get all orders for a selected user ID


exports.getUserOrders = function _callee6(req, res) {
  var userId, userOrders;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(orders.find({
            userId: userId
          }).populate('_id'));

        case 4:
          userOrders = _context6.sent;
          res.json(userOrders);
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching user orders:', _context6.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; //-----------------------------------------------------------------------------------------------------


exports.updateCheckRate = function _callee7(req, res) {
  var orderId, checkRate, order;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          orderId = req.params.orderId;
          checkRate = req.body.checkRate; // Update the checkRate field of the order in your database using Mongoose or any other ORM

          _context7.next = 5;
          return regeneratorRuntime.awrap(orders.findByIdAndUpdate(orderId, {
            checkRate: checkRate
          }));

        case 5:
          order = _context7.sent;

          if (order) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: 'Order not found'
          }));

        case 8:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Rate added successfully'
          }));

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating checkRate:', _context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; //---------------------------------------------------------------------------------------
// Get all orders for selected seller by sellerId


exports.getAllSellerOrders = function _callee9(req, res) {
  var sellerId, seller, sellerOrders, ordersWithUserDetails;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          sellerId = req.params.sellerId; // Find seller by sellerId and role "seller"

          _context9.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            _id: sellerId,
            role: "seller"
          }));

        case 4:
          seller = _context9.sent;

          if (seller) {
            _context9.next = 7;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: 'Seller not found or does not have the role "seller".'
          }));

        case 7:
          _context9.next = 9;
          return regeneratorRuntime.awrap(orders.find({
            sellerId: sellerId
          }));

        case 9:
          sellerOrders = _context9.sent;
          _context9.next = 12;
          return regeneratorRuntime.awrap(Promise.all(sellerOrders.map(function _callee8(order) {
            var userId, productId, user, product;
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    userId = order.userId;
                    productId = order.productId; // Find user details by userId

                    _context8.next = 4;
                    return regeneratorRuntime.awrap(User.findById(userId));

                  case 4:
                    user = _context8.sent;
                    _context8.next = 7;
                    return regeneratorRuntime.awrap(Product.findById(productId));

                  case 7:
                    product = _context8.sent;
                    return _context8.abrupt("return", {
                      _id: order._id,
                      productName: order.productName,
                      user: {
                        userId: user._id,
                        email: user.email,
                        name: user.name // Include other user details if needed

                      },
                      product: {
                        productId: product._id,
                        name: product.name,
                        price: product.price // Include other product details if needed

                      },
                      phoneNumber: order.phoneNumber,
                      qty: order.qty,
                      shippingAddress: order.shippingAddress,
                      // Fixed spelling here
                      delStatus: order.delStatus,
                      date: order.date,
                      checkRate: order.checkRate,
                      seller: {
                        sellerId: seller._id,
                        name: seller.name,
                        // Include seller's name
                        email: seller.email // Include seller's email
                        // Include other seller details if needed

                      }
                    });

                  case 9:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          })));

        case 12:
          ordersWithUserDetails = _context9.sent;
          res.json({
            data: ordersWithUserDetails
          });
          _context9.next = 20;
          break;

        case 16:
          _context9.prev = 16;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching seller orders:', _context9.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 20:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 16]]);
};