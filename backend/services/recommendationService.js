// recommendationService.js (NEW) – simple collaborative filtering based on views/favorites
const Analytics = require('../models/Analytics');
const Car = require('../models/Car');
exports.getRecommendations = async (userId) => {
  // Find cars viewed by similar users or same category
  const recentViews = await Analytics.find({ event: 'view_car', userId }).limit(10);
  const carIds = recentViews.map(a => a.metadata?.carId).filter(Boolean);
  const cars = await Car.find({ _id: { $nin: carIds } }).limit(6);
  return cars;
};
