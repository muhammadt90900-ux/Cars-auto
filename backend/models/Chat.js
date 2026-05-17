// Chat.js (Chat room)
const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, // optional context
  part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Chat', chatSchema);
