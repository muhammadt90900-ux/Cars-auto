// Shipment.js
const mongoose = require('mongoose');
const shipmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  carrier: String,
  trackingNumber: String,
  status: { type: String, enum: ['processing', 'in_transit', 'delivered', 'failed'], default: 'processing' },
  estimatedDelivery: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shipment', shipmentSchema);
