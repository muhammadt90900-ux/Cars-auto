// searchController.js (NEW)
const Car = require('../models/Car');
const Part = require('../models/Part');
const SearchHistory = require('../models/SearchHistory');

exports.searchAll = async (req, res, next) => {
  try {
    const { q } = req.query;
    const cars = await Car.find({ $text: { $search: q } }).limit(20);
    const parts = await Part.find({ $text: { $search: q } }).limit(20);
    res.status(200).json({ success: true, data: { cars, parts } });
  } catch (err) { next(err); }
};

exports.saveSearch = async (req, res, next) => {
  try {
    const { query, filters } = req.body;
    const search = await SearchHistory.create({ user: req.user.id, query, filters });
    res.status(201).json({ success: true, data: search });
  } catch (err) { next(err); }
};
