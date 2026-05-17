// Favorite.js (NEW)
const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemType: { type: String, enum: ['car', 'part'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
  createdAt: { type: Date, default: Date.now }
});
favoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });
module.exports = mongoose.model('Favorite', favoriteSchema);
