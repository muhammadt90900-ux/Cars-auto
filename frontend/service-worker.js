// service-worker.js (simple cache)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('autokurd-v1').then(cache => cache.addAll([
      '/',
      '/offline.html',
      '/css/style.css'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => caches.match('/offline.html')))
  );
});
