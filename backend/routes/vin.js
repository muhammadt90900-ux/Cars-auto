// vin.js
const express = require('express');
const { lookupVin, getVinHistory } = require('../controllers/vinController');
const router = express.Router();
router.get('/lookup/:vin', lookupVin);
router.get('/history', getVinHistory);
module.exports = router;
