// Review.js
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);
