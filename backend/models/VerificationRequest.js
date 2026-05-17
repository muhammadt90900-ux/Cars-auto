// VerificationRequest.js
const mongoose = require('mongoose');
const verificationRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idDocument: String, // cloudinary URL
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('VerificationRequest', verificationRequestSchema);
