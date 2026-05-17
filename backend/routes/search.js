// search.js (NEW)
const express = require('express');
const { searchAll, saveSearch } = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', searchAll);
router.post('/save', protect, saveSearch);
module.exports = router;
