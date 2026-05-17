// orderController.js (minimal)
const Order = require('../models/Order');
exports.createOrder = async (req, res, next) => {
  try {
    req.body.buyer = req.user.id;
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) { next(err); }
};
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ $or: [{ buyer: req.user.id }, { seller: req.user.id }] }).populate('items.productId');
    res.status(200).json({ success: true, data: orders });
  } catch (err) { next(err); }
};
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (err) { next(err); }
};
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ success: true, data: order });
  } catch (err) { next(err); }
};
