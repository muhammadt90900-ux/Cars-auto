// analyticsService.js (NEW)
exports.logEvent = async (event, userId, metadata) => {
  const Analytics = require('../models/Analytics');
  await Analytics.create({ event, userId, metadata });
};
