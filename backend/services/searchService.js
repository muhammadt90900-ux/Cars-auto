// searchService.js (NEW)
const Car = require('../models/Car');
const Part = require('../models/Part');
exports.fullTextSearch = async (query) => {
  const cars = await Car.find({ $text: { $search: query } }).limit(10);
  const parts = await Part.find({ $text: { $search: query } }).limit(10);
  return { cars, parts };
};
