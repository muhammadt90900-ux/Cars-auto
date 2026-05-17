// shipment.js
const express = require('express');
const { getShipment, updateShipment } = require('../controllers/shipmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/:orderId', protect, getShipment);
router.put('/:orderId', protect, updateShipment);
module.exports = router;
