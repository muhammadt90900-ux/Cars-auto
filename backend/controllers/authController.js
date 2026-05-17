// authController.js
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../services/emailService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await User.create({ name, email, password, phone });
    sendTokenResponse(user, 201, res);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Provide email and password' });
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};

exports.logout = async (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 1000), httpOnly: true });
  res.status(200).json({ success: true, message: 'Logged out' });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: 'No user with that email' });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    await sendEmail({ to: user.email, subject: 'Password reset', text: `Reset link: ${resetUrl}` });
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid token' });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwt();
  res.status(statusCode).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
