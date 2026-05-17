// parts.js
const express = require('express');
const { createPart, getParts, getPart, updatePart, deletePart } = require('../controllers/partController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
router.route('/')
  .post(protect, upload.array('images', 10), createPart)
  .get(getParts);
router.route('/:id')
  .get(getPart)
  .put(protect, updatePart)
  .delete(protect, deletePart);
module.exports = router;
