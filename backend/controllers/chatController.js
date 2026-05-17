// chatController.js
const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ participants: req.user.id }).populate('participants', 'name avatar').populate('lastMessage').sort('-createdAt');
    res.status(200).json({ success: true, data: chats });
  } catch (err) { next(err); }
};

exports.getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('participants', 'name avatar');
    const messages = await Message.find({ chat: req.params.id }).populate('sender', 'name').sort('createdAt');
    res.status(200).json({ success: true, data: { chat, messages } });
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ success: false, message: 'Chat not found' });
    const message = await Message.create({ chat: chat._id, sender: req.user.id, content: req.body.content });
    chat.lastMessage = message._id;
    await chat.save();
    // Emit via socket
    const io = req.app.get('io');
    io.to(chat._id.toString()).emit('new_message', message);
    res.status(201).json({ success: true, data: message });
  } catch (err) { next(err); }
};
