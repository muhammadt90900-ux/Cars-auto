// paymentService.js (mock)
exports.processZainCash = async (amount, currency) => {
  return { success: true, transactionId: 'ZNC' + Date.now() };
};
exports.processFib = async (amount, currency) => {
  return { success: true, transactionId: 'FIB' + Date.now() };
};
