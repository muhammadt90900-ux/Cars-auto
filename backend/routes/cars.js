// cars.js
const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar, uploadImages } = require('../controllers/carController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
router.route('/')
  .post(protect, upload.array('images', 10), createCar)
  .get(getCars);
router.route('/:id')
  .get(getCar)
  .put(protect, updateCar)
  .delete(protect, deleteCar);
module.exports = router;
