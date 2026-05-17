// payment.js
const express = require('express');
const { processPayment, handleCallback } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/process', protect, processPayment);
router.post('/callback', handleCallback); // webhook from gateway
module.exports = router;
