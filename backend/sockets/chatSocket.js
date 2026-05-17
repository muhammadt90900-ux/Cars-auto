// chatSocket.js
let io;
module.exports = {
  initChat: (socketIo) => {
    io = socketIo;
    io.on('connection', (socket) => {
      socket.on('join_chat', (chatId) => {
        socket.join(chatId);
      });
      socket.on('send_message', (data) => {
        io.to(data.chatId).emit('new_message', data);
      });
    });
  }
};
