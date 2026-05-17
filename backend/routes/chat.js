// chat.js
const express = require('express');
const { getChats, getChat, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', protect, getChats);
router.get('/:id', protect, getChat);
router.post('/:id/message', protect, sendMessage);
module.exports = router;
