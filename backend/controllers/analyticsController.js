// analyticsController.js (NEW)
const Analytics = require('../models/Analytics');
exports.trackEvent = async (req, res, next) => {
  try {
    const { event, metadata } = req.body;
    const analytic = await Analytics.create({ event, userId: req.user?.id, metadata });
    res.status(201).json({ success: true, data: analytic });
  } catch (err) { next(err); }
};
exports.getAdminAnalytics = async (req, res, next) => {
  try {
    const carViews = await Analytics.countDocuments({ event: 'view_car' });
    const searches = await Analytics.countDocuments({ event: 'search' });
    res.status(200).json({ success: true, data: { carViews, searches } });
  } catch (err) { next(err); }
};
