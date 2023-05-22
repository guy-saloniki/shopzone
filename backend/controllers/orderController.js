import asyncHandler from '../middleware/asyncHandler.js';

// Create new order
// route - POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// Get logged in user orders
// route - GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('Get my orders');
});

// Get order by id
// route - GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('Get order by id');
});

// Update order to paid
// route - GET /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// Update order to delivered
// route - GET /api/orders/:id/deliver
// Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// Get all orderes
// route - GET /api/orders
// Private
const getAllOrders = asyncHandler(async (req, res) => {
  res.send('get all orderes');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
