// Order.js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productType: { type: String, enum: ['car', 'part'] },
    productId: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.productType' },
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { fullName: String, phone: String, city: String, address: String },
  paymentMethod: { type: String }, // zainCash, fib, etc.
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
