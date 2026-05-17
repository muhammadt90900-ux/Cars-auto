// admin.js
const express = require('express');
const { adminDashboard, manageUsers, manageListings, approveCar, approvePart } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();
router.use(protect, authorize('admin'));
router.get('/dashboard', adminDashboard);
router.get('/users', manageUsers);
router.get('/listings', manageListings);
router.put('/cars/:id/approve', approveCar);
router.put('/parts/:id/approve', approvePart);
module.exports = router;
