// frontend/js/analytics.js
function trackEvent(event, metadata = {}) {
  if (!navigator.onLine) return;
  fetchAPI('/analytics/track', {
    method: 'POST',
    body: JSON.stringify({ event, metadata })
  }).catch(() => {});
}
// Example usage: trackEvent('view_car', { carId: '...' })
