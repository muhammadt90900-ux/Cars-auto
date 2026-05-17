// carController.js
const Car = require('../models/Car');
const cloudinary = require('../config/cloudinary');

exports.createCar = async (req, res, next) => {
  try {
    req.body.seller = req.user.id;
    if (req.files && req.files.length > 0) {
      const images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'autokurd/cars' });
        images.push(result.secure_url);
      }
      req.body.images = images;
    }
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
  } catch (err) { next(err); }
};

exports.getCars = async (req, res, next) => {
  try {
    const { make, model, yearMin, yearMax, priceMin, priceMax, search } = req.query;
    const filter = {};
    if (make) filter.make = make;
    if (model) filter.model = model;
    if (yearMin || yearMax) filter.year = { ...(yearMin && { $gte: Number(yearMin) }), ...(yearMax && { $lte: Number(yearMax) }) };
    if (priceMin || priceMax) filter.price = { ...(priceMin && { $gte: Number(priceMin) }), ...(priceMax && { $lte: Number(priceMax) }) };
    if (search) filter.$text = { $search: search };
    const cars = await Car.find(filter).populate('seller', 'name email phone').sort('-createdAt');
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (err) { next(err); }
};

exports.getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email phone');
    if (!car) return res.status(404).json({ success: false, message: 'Car not found' });
    car.views += 1;
    await car.save();
    res.status(200).json({ success: true, data: car });
  } catch (err) { next(err); }
};

exports.updateCar = async (req, res, next) => {
  try {
    let car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found' });
    if (car.seller.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorized' });
    car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: car });
  } catch (err) { next(err); }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found' });
    if (car.seller.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorized' });
    await car.deleteOne();
    res.status(200).json({ success: true, message: 'Car deleted' });
  } catch (err) { next(err); }
};
