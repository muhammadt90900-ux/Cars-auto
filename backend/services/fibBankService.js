// backend/services/fibBankService.js
const axios = require('axios');

exports.processPayment = async ({ amount, currency = 'IQD', cardDetails, orderId }) => {
  // Integration with FIB Bank API
  const response = await axios.post(process.env.FIB_API_URL, {
    amount,
    currency,
    cardDetails,
    orderId,
    apiKey: process.env.FIB_API_KEY,
    redirectUrl: `${process.env.BACKEND_URL}/api/payment/callback/fib`
  });
  return response.data; // { transactionId, redirectUrl }
};
