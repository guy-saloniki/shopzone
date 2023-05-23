import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// Create new order
// route - POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});

// Get logged in user orders
// route - GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  const oreders = await Order.find({});
  res.status(200).json(oreders);
});

// Get order by id
// route - GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.status(200).json(order);
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
