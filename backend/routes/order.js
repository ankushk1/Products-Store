var express = require('express');
var router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth');
const { updateStock } = require('../controllers/product');
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require('../controllers/order');

//params
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//create order
router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read
router.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of order
router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  '/order/:orderId/status/userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
