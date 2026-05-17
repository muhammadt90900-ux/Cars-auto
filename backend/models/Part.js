// Part.js
const mongoose = require('mongoose');
const partSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // engine, brakes, ...
  compatibleCars: [{ make: String, model: String, year: Number }],
  price: { type: Number, required: true },
  currency: { type: String, default: 'IQD' },
  condition: { type: String, enum: ['new', 'used', 'refurbished'] },
  description: String,
  images: [String],
  stock: { type: Number, default: 1 },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
partSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('Part', partSchema);
