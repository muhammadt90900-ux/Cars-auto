// adminController.js (basic)
const User = require('../models/User');
const Car = require('../models/Car');
const Part = require('../models/Part');
const Order = require('../models/Order');

exports.adminDashboard = async (req, res) => {
  const usersCount = await User.countDocuments();
  const carsCount = await Car.countDocuments();
  const partsCount = await Part.countDocuments();
  const ordersCount = await Order.countDocuments();
  res.status(200).json({ success: true, data: { usersCount, carsCount, partsCount, ordersCount } });
};
exports.manageUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
};
exports.manageListings = async (req, res) => {
  const cars = await Car.find().populate('seller', 'name');
  const parts = await Part.find().populate('seller', 'name');
  res.status(200).json({ success: true, data: { cars, parts } });
};
exports.approveCar = async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  res.status(200).json({ success: true, data: car });
};
exports.approvePart = async (req, res) => {
  const part = await Part.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  res.status(200).json({ success: true, data: part });
};
