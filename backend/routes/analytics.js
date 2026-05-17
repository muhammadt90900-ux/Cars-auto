// analytics.js (NEW)
const express = require('express');
const { trackEvent, getAdminAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/track', trackEvent);
router.get('/admin', protect, authorize('admin'), getAdminAnalytics);
module.exports = router;
