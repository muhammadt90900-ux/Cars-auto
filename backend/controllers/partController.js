// partController.js (similar pattern)
const Part = require('../models/Part');
const cloudinary = require('../config/cloudinary');

exports.createPart = async (req, res, next) => {
  try {
    req.body.seller = req.user.id;
    if (req.files && req.files.length > 0) {
      const images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'autokurd/parts' });
        images.push(result.secure_url);
      }
      req.body.images = images;
    }
    const part = await Part.create(req.body);
    res.status(201).json({ success: true, data: part });
  } catch (err) { next(err); }
};

exports.getParts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };
    const parts = await Part.find(filter).populate('seller', 'name email phone').sort('-createdAt');
    res.status(200).json({ success: true, count: parts.length, data: parts });
  } catch (err) { next(err); }
};

exports.getPart = async (req, res, next) => {
  try {
    const part = await Part.findById(req.params.id).populate('seller', 'name email phone');
    if (!part) return res.status(404).json({ success: false, message: 'Part not found' });
    res.status(200).json({ success: true, data: part });
  } catch (err) { next(err); }
};

exports.updatePart = async (req, res, next) => {
  try {
    let part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ success: false, message: 'Part not found' });
    if (part.seller.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorized' });
    part = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: part });
  } catch (err) { next(err); }
};

exports.deletePart = async (req, res, next) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ success: false, message: 'Part not found' });
    if (part.seller.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorized' });
    await part.deleteOne();
    res.status(200).json({ success: true, message: 'Part deleted' });
  } catch (err) { next(err); }
};
