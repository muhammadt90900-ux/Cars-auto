// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: { type: String },
  role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  verificationRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'VerificationRequest' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
  avatar: { type: String },
  language: { type: String, enum: ['ku', 'ar', 'en'], default: 'ku' },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now }
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.getSignedJwt = function() {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};
userSchema.methods.matchPassword = async function(entered) {
  return bcrypt.compare(entered, this.password);
};
module.exports = mongoose.model('User', userSchema);
