// frontend/js/chat.js
let socket;
function initChat() {
  socket = io(API_BASE.replace('/api',''));
  const token = localStorage.getItem('token');
  socket.emit('register', { token });
  
  socket.on('new_message', (msg) => {
    displayMessage(msg);
  });
}
function sendMessage(chatId, content) {
  socket.emit('send_message', { chatId, content });
}
