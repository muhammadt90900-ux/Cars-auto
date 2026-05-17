// Car.js
const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make: { type: String, required: true }, // brand
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'IQD' },
  mileage: { type: Number },
  fuelType: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid'] },
  transmission: { type: String, enum: ['manual', 'automatic'] },
  bodyType: { type: String },
  description: { type: String },
  images: [String],
  vin: { type: String },
  location: { city: String, region: String },
  isSold: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
carSchema.index({ make: 'text', model: 'text', description: 'text' });
module.exports = mongoose.model('Car', carSchema);
