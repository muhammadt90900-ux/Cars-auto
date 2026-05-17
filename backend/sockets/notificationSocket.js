// notificationSocket.js
module.exports = {
  initNotifications: (io) => {
    io.on('connection', (socket) => {
      socket.on('register', (userId) => {
        socket.join(`user_${userId}`);
      });
    });
    // Later, services can emit to `user_${userId}` for real-time notifications
  }
};
