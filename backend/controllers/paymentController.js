// paymentController.js (mock)
exports.processPayment = async (req, res) => {
  // In real implementation, integrate with ZainCash/FIB
  const transactionId = 'mock_txn_' + Date.now();
  res.status(200).json({ success: true, transactionId });
};
exports.handleCallback = async (req, res) => {
  // Handle payment gateway callback
  res.status(200).json({ success: true, message: 'Payment confirmed' });
};
