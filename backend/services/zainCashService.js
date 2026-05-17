// backend/services/zainCashService.js
const axios = require('axios');

exports.processPayment = async ({ amount, currency = 'IQD', phone, orderId }) => {
  // Integration with ZainCash API – replace with real endpoint
  const response = await axios.post(process.env.ZAINCASH_API_URL, {
    amount,
    currency,
    phone,
    orderId,
    apiKey: process.env.ZAINCASH_API_KEY,
    callbackUrl: `${process.env.BACKEND_URL}/api/payment/callback/zaincash`
  });
  return response.data; // { transactionId, redirectUrl }
};

exports.verifyCallback = (payload) => {
  // Verify signature from ZainCash
  return true; // Mock
};
