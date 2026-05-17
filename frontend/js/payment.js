// frontend/js/payment.js
async function processPayment(payload) {
  const data = await fetchAPI('/payment/process', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  if (data.success && data.redirectUrl) {
    window.location.href = data.redirectUrl;
  }
}
