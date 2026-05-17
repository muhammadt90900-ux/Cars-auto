// frontend/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.error('SW registration failed', err));
  }
  // Set language from localStorage or browser
  const lang = localStorage.getItem('lang') || navigator.language.slice(0,2);
  if (!['ku','ar','en'].includes(lang)) lang = 'ku';
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';
});
