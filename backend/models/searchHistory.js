// SearchHistory.js (NEW)
const mongoose = require('mongoose');
const searchHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  query: { type: String, required: true },
  filters: Object,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('SearchHistory', searchHistorySchema);
