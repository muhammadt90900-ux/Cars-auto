// js/i18n.js
const translations = {
  ku: { search: 'گەڕان', home: 'سەرەکی', dashboard: 'داشبۆرد' },
  ar: { search: 'بحث', home: 'الرئيسية', dashboard: 'لوحة التحكم' },
  en: { search: 'Search', home: 'Home', dashboard: 'Dashboard' }
};
function t(key) {
  const lang = localStorage.getItem('lang') || 'ku';
  return translations[lang]?.[key] || key;
}
