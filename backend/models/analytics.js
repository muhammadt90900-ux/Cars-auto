// Analytics.js (NEW) – stores page views, interactions
const mongoose = require('mongoose');
const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true }, // view_car, search, click_recommendation
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Analytics', analyticsSchema);
