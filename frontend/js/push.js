// frontend/js/push.js
async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
  });
  // Send subscription to backend
  await fetchAPI('/users/subscribe', {
    method: 'POST',
    body: JSON.stringify({ subscription })
  });
}
function urlBase64ToUint8Array(base64String) {
  // standard conversion...
}
